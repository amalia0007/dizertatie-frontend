import {Component, ElementRef, OnInit} from '@angular/core';
import {ResponsePageList} from '../../model/ResponsePageList';
import {Game} from '../../model/Game';
import {UserData} from '../../model/UserData';
import {GameService} from '../../services/game.service';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-rented',
  templateUrl: './top-rented.component.html',
  styleUrls: ['./top-rented.component.css']
})
export class TopRentedComponent implements OnInit {

  paginatedGames: ResponsePageList<Game>;
  games: Game[] = [];
  p: any;
  currentUser: UserData;

  constructor(private gameService: GameService,
              private eRef: ElementRef,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  initListOfGames() {

    this.gameService.getPaginatedGames('rentalCount', 'DESC', '0', '4', '').toPromise().then(p => {
      this.paginatedGames = p;
      this.games = this.paginatedGames.pageList;

    });

  }

  seeCompanies() {
    this.router.navigate(['/partners']);
  }

  async ngOnInit() {
    this.p = 0;
    const token = this.authenticationService.getToken();
    const decode = jwt_decode(token);
    const email = decode['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => {
      this.currentUser = user;
      this.initListOfGames();
    });
  }

  pageGridChanged(event) {
    this.p = event;
    this.gameService.getPaginatedGames('rentalCount', 'DESC', (this.p - 1).toString(), '4', '').subscribe(p => {

      this.paginatedGames = p;
      this.games = this.paginatedGames.pageList;
    });
  }

  gameRented(event: boolean) {
    this.gameService.getPaginatedGames('rentalCount', 'DESC', this.p.toString(), '4', '').subscribe(p => {
      this.paginatedGames = p;
      this.games = this.paginatedGames.pageList;
    });
  }

}



