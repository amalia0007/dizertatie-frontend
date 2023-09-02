import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserGameService} from '../../services/user-game.service';
import {AuthenticationService} from '../../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {DialogEditProfileService} from '../../services/dialog-edit-profile/dialog-edit-profile.service';
import {UserData} from '../../model/UserData';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Category} from '../../model/Category';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rented-games',
  templateUrl: './rented-games.component.html',
  styleUrls: ['./rented-games.component.css']
})
export class RentedGamesComponent implements OnInit, OnDestroy {

  allCategories = [];
  available = [];
  selected = [];
  decoded: any;
  currentUser: UserData;
  showRented = false;
  showCategoryModule = false;

  // listItems: Array<S> = ['Baseball', 'Basketball', 'Cricket', 'Field Hockey', 'Football', 'Table Tennis', 'Tennis', 'Volleyball'];

  constructor(private userService: UserService,
              private userGameService: UserGameService,
              private authenticationService: AuthenticationService,
              private dialogEditProfileService: DialogEditProfileService,
              private categoryService: CategoryService,
              private notifications: ToastrService,
              private router: Router) {
  }

  async ngOnInit() {
    const setOfCategories = new Set<string>();
    const list: Array<Category> = await this.categoryService.getAllUnique().toPromise();
    list.forEach(category => setOfCategories.add(category.name));

    setOfCategories.forEach(category => this.available.push(category));
    setOfCategories.forEach(category => this.allCategories.push(category));

    // tslint:disable-next-line:triple-equals
    this.showRented = (localStorage.getItem('showRented') == 'true');
    console.log(this.showRented + 'again');
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    this.currentUser.categories.forEach(category => this.selected.push(category.name));
    this.selected.forEach(cat => {
      const index = this.available.indexOf(cat);
      if (index !== -1) {
        this.available.splice(index, 1);
      }
    });
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
  }

  seeCompanies() {
    this.router.navigate(['/partners']);
  }

  showRentedGames() {
    this.showCategoryModule = false;
    // tslint:disable-next-line:triple-equals
    if (localStorage.getItem('showRented') == 'false') {
      localStorage.setItem('showRented', 'true');
    } else {
      localStorage.setItem('showRented', 'false');
    }
    // tslint:disable-next-line:triple-equals
    this.showRented = (localStorage.getItem('showRented') == 'true');
  }

  ngOnDestroy(): void {
    localStorage.setItem('showRented', String(this.showRented));
  }

  editAccount() {
    this.editUserDialog();
  }

  editUserDialog() {
    this.dialogEditProfileService.confirm('Edit your profile', 'Message').then(value => {
      this.userService.getUserByEmail(this.decoded.sub).toPromise()
        .then(t => {
          this.currentUser = t;
        });
    })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showCategoryEditModule() {
    this.showCategoryModule = !this.showCategoryModule;
    this.showRented = false;
  }

  async updateFavCategories() {
    this.currentUser.categories = [];
    this.selected.forEach(category => this.currentUser.categories.push(new Category(category)));
    await this.userService.updateUser(this.currentUser).toPromise();
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.notifications.success('List of favorite categories updated');
    });
  }
}
