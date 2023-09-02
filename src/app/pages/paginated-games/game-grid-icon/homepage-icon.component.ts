import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Game} from 'src/app/model/Game';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../../services/user.service';
import {UserGameService} from '../../../services/user-game.service';
import {ToastrService} from 'ngx-toastr';
import {UserData} from '../../../model/UserData';
import {UserGame} from "../../../model/UserGame";

@Component({
  selector: 'app-homepage-icon',
  templateUrl: './homepage-icon.component.html',
  styleUrls: ['./homepage-icon.component.css']
})
export class HomepageIconComponent implements OnInit {

  @Input() game: Game;
  @Input() user: UserData;
  @Input() userGame: UserGame;
  @Output() gameRented: EventEmitter<boolean> = new EventEmitter<boolean>();
  decoded: any;
  loading: boolean;

  constructor(private userGameService: UserGameService,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notifications: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  seeGameDetails(gameId: number) {
    this.router.navigate(['/game-details'], {queryParams: {gameId: gameId}});
  }


  async rent() {
    this.loading = true;
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    const currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    console.log(currentUser);

    // get current date and add maximum-period days
    const today = new Date();
    const maxRentDays = 10;

    today.setDate(today.getDate() + maxRentDays);

    this.userGameService.addUserGame(currentUser, this.game, today.toISOString().slice(0, 10)).subscribe(
      value => {
        this.showSuccess();
        this.gameRented.emit(true);
        this.loading = false;

      }, error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }


  showSuccess() {
    this.notifications.success(this.game.title + ' was rented successfully!', 'Enjoy!');
  }

  showError(error: string) {
    this.notifications.error(error, 'Error!');
  }
}
