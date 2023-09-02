import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../authentication.service';
import {Image} from '../../model/Image';
import {UserData} from '../../model/UserData';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Category} from '../../model/Category';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.css']
})
export class DialogEditProfileComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  selectedFile: any;
  imgURL: string;
  btnValue: string = 'Select image ( * required )';
  uploadedImage: Image;
  user: UserData;
  firstName: string;
  lastName: string;
  byteBlob: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  todo = [];
  private done = [];

  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private notifications: ToastrService,
              private categoryService: CategoryService) {
  }

  async ngOnInit() {
    const setCategories = new Set<string>();
    const list: Array<Category> = await this.categoryService.getAllUnique().toPromise();
    list.forEach(category => setCategories.add(category.name));
    setCategories.forEach(category => this.todo.push(category));

    const token = this.authenticationService.getToken();
    const decode = jwt_decode(token);
    const email = decode['sub'];
    this.user = await this.userService.getUserByEmail(email).toPromise();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.selectedFile = this.user.img;
    this.imgURL = 'data:image/jpeg;base64,' + this.user.img.pic;
    this.btnValue = 'Choose another image';
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.done);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }


  async save() {
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        const splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
        this.btnValue = 'Choose another profile picture';
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    } else {
      this.uploadedImage = this.user.img;
    }
    this.user.img = this.uploadedImage;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    console.log(this.user);
    this.userService.updateUserImg(this.user).subscribe(() => {
      this.notifications.success('The profile was updated successfully!', 'Congratulation!');
      this.accept();
    }, error => {
      this.notifications.error(error);
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedFile = event;
    this.croppedImage = event.base64;
    this.imgURL = event.base64;
  }

  imageLoaded() {
  }

  cropperReady() {
  }

  loadImageFailed() {
    // show message
  }
}
