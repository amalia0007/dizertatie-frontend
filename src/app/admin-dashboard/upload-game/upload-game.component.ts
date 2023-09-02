import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Game} from '../../model/Game';
import {Developer} from '../../model/Developer';
import {Category} from '../../model/Category';
import {Image} from '../../model/Image';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-upload-game',
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent implements OnChanges {

  @Output() added: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editedGame: Game;
  game: Game;
  title: string;
  idSerial: string;
  gameStudio: string;
  year: number;
  description: string;
  stock: number;
  averageStars: number;
  uploadedImage: Image;
  tempDevelopers = new Set<string>();
  tempCategories = new Set<string>();
  selectedFile: any;
  imgURL: string;
  private byteBlob: string;


  @ViewChild('f', {static: false}) formValues;
  developer: any;
  category: any;

  constructor(
    // tslint:disable-next-line:max-line-length
    private gameUploadService: GameService, private userService: UserService, private authenticationService: AuthenticationService, private notifications: ToastrService) {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = event;
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

  async uploadGame() {
    const developersForUpload = [];
    const categoriesForUpload = [];
    for (const developer of this.tempDevelopers) {
      developersForUpload.push(new Developer(developer));
    }
    for (const category of this.tempCategories) {
      categoriesForUpload.push(new Category(category));
    }
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        const splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    }
    // tslint:disable-next-line:max-line-length
    this.game = new Game(this.idSerial, this.title, [], this.gameStudio, this.year, [], this.uploadedImage, [], this.description, this.stock, 0);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < developersForUpload.length; i++) {
      this.game.developers.push(developersForUpload[i]);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < categoriesForUpload.length; i++) {
      this.game.categories.push(categoriesForUpload[i]);
    }

    this.gameUploadService.addGame(this.game)
      .toPromise().then(
      data => {
        this.showUploadSuccess();
        this.added.emit(true);
      },
      error => {
        this.showUploadError(error);
      });

    this.reset();
    this.formValues.resetForm();

  }

  reset() {
    this.title = null;
    this.idSerial = null;
    this.gameStudio = null;
    this.year = null;
    this.imgURL = null;
    this.tempDevelopers = new Set<string>();
    this.tempCategories = new Set<string>();
    this.game = null;
    this.editedGame = null;
    this.description = null;
    this.stock = null;
    this.selectedFile = null;
  }

  addDeveloper(event: any) {
    this.tempDevelopers.add(event);
    const devInput = document.getElementById('developer') as HTMLInputElement;
    devInput.value = '';
  }

  addCategory(event: any) {
    this.tempCategories.add(event);
    const categoryInput = document.getElementById('category') as HTMLInputElement;
    categoryInput.value = '';
  }

  deleteDeveloper(dev: string) {
    this.tempDevelopers.delete(dev);
  }

  deleteCategory(category: string) {
    this.tempCategories.delete(category);
  }

  ngOnChanges(): void {
    if (this.editedGame) {
      this.tempDevelopers = new Set<string>();
      this.tempCategories = new Set<string>();
      this.title = this.editedGame.title;
      this.idSerial = this.editedGame.idSerial;
      this.selectedFile = this.editedGame.img.pic;
      this.imgURL = 'data:image/jpeg;base64,' + this.editedGame.img.pic;
      this.gameStudio = this.editedGame.gameStudio;
      this.year = this.editedGame.year;
      this.description = this.editedGame.description;
      this.stock = this.editedGame.stock;
      this.averageStars = this.editedGame.averageStars;
      this.uploadedImage = this.editedGame.img;
      for (const developer1 of this.editedGame.developers) {
        this.tempDevelopers.add(developer1.name);
      }
      for (const category1 of this.editedGame.categories) {
        this.tempCategories.add(category1.name);
      }
    } else {
      this.tempDevelopers = new Set<string>();
      this.tempCategories = new Set<string>();
      this.reset();
    }
  }


  async editGame() {
    const developersForUpload = [];
    const categoriesForUpload = [];
    for (const tempDeveloper of this.tempDevelopers) {
      developersForUpload.push(new Developer(tempDeveloper));
    }
    for (const category of this.tempCategories) {
      categoriesForUpload.push(new Category(category));
    }
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        const splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    }
    this.game = this.editedGame;
    this.game.idSerial = this.idSerial;
    this.game.title = this.title;
    this.game.developers = [];
    this.game.gameStudio = this.gameStudio;
    this.game.year = this.year;
    this.game.description = this.description;
    this.game.stock = this.stock;
    this.game.averageStars = this.averageStars;
    this.game.categories = [];
    this.game.img = this.uploadedImage;
    this.game.gameRatings = this.editedGame.gameRatings;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < developersForUpload.length; i++) {
      this.game.developers.push(developersForUpload[i]);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < categoriesForUpload.length; i++) {
      this.game.categories.push(categoriesForUpload[i]);
    }

    this.gameUploadService.addGame(this.game)
      .subscribe(
        data => {
          this.showEditSuccess();
          this.added.emit(false);
        },
        error => {
          this.showEditError(error);
        });

    this.reset();
    this.formValues.resetForm();
  }

  showEditSuccess() {
    this.notifications.success('Your edit was successful', 'Great!');
  }

  showEditError(error: string) {
    this.notifications.error(error, 'Error!');
  }

  showUploadSuccess() {
    this.notifications.success('You successfully added a new game', 'Great!');
  }

  showUploadError(error: string) {
    this.notifications.error(error, 'Error!');
  }

}
