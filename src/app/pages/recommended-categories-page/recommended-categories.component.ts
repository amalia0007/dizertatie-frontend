import {Component, OnInit} from '@angular/core';

import {UserData} from '../../model/UserData';
import {UserService} from '../../services/user.service';
import {UserGameService} from '../../services/user-game.service';
import {AuthenticationService} from '../../services/authentication.service';
import {DialogEditProfileService} from '../../services/dialog-edit-profile/dialog-edit-profile.service';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../model/Category';
import * as jwt_decode from 'jwt-decode';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recommended-categories-page',
  templateUrl: './recommended-categories.component.html',
  styleUrls: ['./recommended-categories.component.css'],
})
export class RecommendedCategoriesComponent implements OnInit {

  public available = [];
  public selected = [];
  public decoded: any;
  public currentUser: UserData;
  public allCategories = [];

  constructor(private userService: UserService,
              private userGameService: UserGameService,
              private authenticationService: AuthenticationService,
              private dialogEditProfileService: DialogEditProfileService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private router: Router) {
  }


  async ngOnInit() {
    const setOfCategories = new Set<string>();
    const list: Array<Category> = await this.categoryService.getAllUnique().toPromise();
    list.forEach(categ => setOfCategories.add(categ.name));
    setOfCategories.forEach(cat => this.available.push(cat));
    setOfCategories.forEach(category => this.allCategories.push(category));
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    this.currentUser.categories.forEach(category => this.selected.push(category.name));
    this.selected.forEach(category => {
      const index = this.available.indexOf(category);
      if (index !== -1) {
        this.available.splice(index, 1);
      }
    });
  }

  seeCompanies() {
    this.router.navigate(['/partners']);
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

  async updatePreferences() {
    this.currentUser.categories = [];
    this.selected.forEach(category => this.currentUser.categories.push(new Category(category)));
    this.currentUser.skipped = true;
    await this.userService.updateUser(this.currentUser).toPromise();
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.toastrService.success('Favorite categories updated');
      this.router.navigate(['/homepage']);
    });
  }


  async skip() {
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.currentUser.skipped = true;
      this.userService.updateUser(this.currentUser).toPromise().then(() => {
        this.router.navigate(['/homepage']);
      });
    });
  }
}
