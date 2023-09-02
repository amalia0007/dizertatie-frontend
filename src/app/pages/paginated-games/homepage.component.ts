import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Game} from '../../model/Game';
import {GameService} from '../../services/game.service';
import {ResponsePageList} from '../../model/ResponsePageList';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {UserData} from '../../model/UserData';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import {Category} from '../../model/Category';
import {CategoryService} from '../../services/category.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private gameService: GameService,
              private eRef: ElementRef,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  formData: FormData;

  gameResponsePageList: ResponsePageList<Game>;
  gameResponsePageList1: ResponsePageList<Game>;
  favoritePaginatedGames: ResponsePageList<Game>;
  games: Game[] = [];
  searchedGames: Game[] = [];
  preferenceGames: Game[] = [];
  value: string;
  p: any;
  q: any;
  r: any;
  flagSearch: boolean;
  currentUser: UserData;
  categories: Category[];
  uniqueCategories = new Set<string>();
  catValue = '';
  allCategories = 'All categories';

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.value = null;
    }
  }

  initListOfGames() {

    this.gameService.getPaginatedGames('id', 'DESC', '0', '3', this.catValue).toPromise().then(p => {
      this.gameResponsePageList = p;
      this.games = this.gameResponsePageList.pageList;

    });

    this.gameService.getPaginatedGames('id', 'DESC', '0', '3', '').toPromise().then(q => {
      this.gameResponsePageList1 = q;
      this.searchedGames = this.gameResponsePageList1.pageList;
    });

    this.gameService.getPaginatedFavoriteGames('id', 'DESC', '0', '3', this.currentUser.id.toString()).toPromise().then(r => {
      this.favoritePaginatedGames = r;
      this.preferenceGames = this.favoritePaginatedGames.pageList;
    });

  }

  async ngOnInit() {
    this.p = 0;
    this.q = 0;
    this.r = 0;
    const token = this.authenticationService.getToken();
    const decode = jwt_decode(token);
    // @ts-ignore
    const email = decode['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => {
      this.currentUser = user;
      this.initListOfGames();
    });

    await this.categoryService.getAllUnique().toPromise().then(genres => this.categories = genres);
    this.categories.forEach(genre => this.uniqueCategories.add(genre.name));


  }

  pageGridChanged(event) {
    this.p = event;
    this.gameService.getPaginatedGames('id', 'DESC', (this.p - 1).toString(), '3', this.catValue).subscribe(p => {

      this.gameResponsePageList = p;
      this.games = this.gameResponsePageList.pageList;
    });
  }

  seeCompanies() {
    this.router.navigate(['/partners']);
  }

  preferencesChanged(event) {
    this.r = event;
    this.gameService.getPaginatedFavoriteGames('id', 'DESC', (this.r - 1).toString(), '3', this.currentUser.id.toString()).subscribe(r => {

      this.favoritePaginatedGames = r;
      this.preferenceGames = this.favoritePaginatedGames.pageList;
    });
  }

  inputSearchChanged() {
    this.flagSearch = false;
    this.gameService.getPaginatedGames('id', 'DESC', '0', '3', this.value).subscribe(q => {
      this.gameResponsePageList1 = q;
      this.searchedGames = this.gameResponsePageList1.pageList;
      this.flagSearch = true;
    });

  }

  receiveMessage(event) {
    this.formData = event;
  }

  showRented(event: boolean) {
    this.gameService.getPaginatedGames('id', 'DESC', this.p.toString(), '3', '').subscribe(p => {
      this.gameResponsePageList = p;
      this.games = this.gameResponsePageList.pageList;
    });
  }


  categorySelected(genre: string) {
    // tslint:disable-next-line:triple-equals
    if (genre == this.allCategories) {
      this.gameService.getPaginatedGames('id', 'DESC', '0', '3', '').toPromise().then(p => {
        this.gameResponsePageList = p;
        this.games = this.gameResponsePageList.pageList;
      });
      this.catValue = '';
      return;
    }
    this.catValue = genre;
    this.gameService.getPaginatedGames('id', 'DESC', '0', '3', this.catValue).toPromise().then(p => {
      this.gameResponsePageList = p;
      this.games = this.gameResponsePageList.pageList;
    });

  }
}
