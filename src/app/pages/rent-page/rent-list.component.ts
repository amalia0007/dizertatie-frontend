import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from '../../model/UserData';
import {ResponsePageList} from '../../model/ResponsePageList';
import {UserGameService} from '../../services/user-game.service';
import {UserGame} from '../../model/UserGame';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {

  @Input() currentUser: User;
  @Output() fullUserEventEmitter: EventEmitter<UserData> = new EventEmitter<UserData>();
  @Output() userEmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  userGames: UserGame[];
  nrOfElements: any;
  p: any;
  paginatedRentedGames: ResponsePageList<UserGame>;

  constructor(private userGameService: UserGameService, private router: Router, private notifications: ToastrService) {
  }

  initListOfRentedGames() {
    this.userGameService.getRentedGames('id', 'ASC', '0', '5', String(this.currentUser.id)).subscribe(userGames => {
      this.paginatedRentedGames = userGames;
      this.userGames = this.paginatedRentedGames.pageList;
      this.nrOfElements = this.paginatedRentedGames.nrOfElements;
    });
  }


  ngOnInit() {
    this.p = 0;
    this.initListOfRentedGames();
  }

  pageGridChanged(event) {
    this.p = event;
    this.userGameService.getRentedGames('id', 'ASC', (this.p - 1).toString(), '5', String(this.currentUser.id)).subscribe(userGames => {
      this.paginatedRentedGames = userGames;
      this.userGames = this.paginatedRentedGames.pageList;
      this.nrOfElements = this.paginatedRentedGames.nrOfElements;
    });
  }


  async returnRentedGame(userGame: UserGame) {
    this.userGameService.returnRentedGame(userGame).subscribe(() => {
      this.notifications.success(userGame.game.title + ' was returned', 'Returned with success!');
      const nr = Math.floor(this.nrOfElements / 5);
      // tslint:disable-next-line:triple-equals
      if (this.nrOfElements % 5 == 0) {
        this.pageGridChanged(nr);
      } else {
        this.pageGridChanged(nr + 1);
      }
    });
  }

  goToPage(id: number) {
    this.router.navigate(['/game-details'], {queryParams: {gameId: id}});
  }
}
