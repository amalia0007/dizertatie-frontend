import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserData} from '../../model/UserData';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserGame} from '../../model/UserGame';
import {ResponsePageList} from '../../model/ResponsePageList';
import {UserGameService} from '../../services/user-game.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnChanges, OnInit {


  @Input() selectedUser: UserData;
  currentUser: UserData;
  private enableButton: any;
  private banButton: any;
  model: any;
  private banUntil: Date;


  userGames: UserGame[];
  nrOfElements: any;
  p: any;
  private userGameResponsePageList: ResponsePageList<UserGame>;

  constructor(private userService: UserService,
              private notifications: ToastrService,
              private userGameService: UserGameService,
              private authenticationService: AuthenticationService) {
  }

  async initListOfRentedGames() {
    await this.userGameService.getRentedGames('id', 'ASC', '0', '5', String(this.selectedUser.id)).toPromise().then(userGames => {
      this.userGameResponsePageList = userGames;
      this.userGames = this.userGameResponsePageList.pageList;
      this.nrOfElements = this.userGameResponsePageList.nrOfElements;
    });
  }


  async ngOnInit() {
    const token = this.authenticationService.getToken();
    const decoded = jwt_decode(token);
    const email = decoded['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => this.currentUser = user);
    await this.initListOfRentedGames();
  }


  pageGridChanged(event) {
    this.p = event;
    this.userGameService.getRentedGames('id', 'ASC', (this.p - 1).toString(), '5', String(this.selectedUser.id)).subscribe(userGames => {
      this.userGameResponsePageList = userGames;
      this.userGames = this.userGameResponsePageList.pageList;
      this.nrOfElements = this.userGameResponsePageList.nrOfElements;
    });
  }


  async returnRentedGames(userGame: UserGame) {
    this.userGameService.returnRentedGame(userGame).subscribe(() => {
      this.notifications.success('The game ' + userGame.game.title + ' was returned', 'Thank you!');
      const nr = Math.floor(this.nrOfElements / 5);
      // tslint:disable-next-line:triple-equals
      if (this.nrOfElements % 5 == 0) {
        this.pageGridChanged(nr);
      } else {
        this.pageGridChanged(nr + 1);
      }
    });
  }

  async activate() {
    this.userService.findVerificationTokenByEmail(this.selectedUser.email).subscribe(value => {
      this.userService.registerConfirm(value['token']).subscribe(() => {
        this.notifications.success('The email: ' + this.selectedUser.email + ' was activated');
        this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(v => {
          this.selectedUser = v;
          this.changeEnableButton(this.selectedUser);
        });

      }, error => {
        this.notifications.error(error);
      });
    });
  }

  async removeOnePenalty(user: UserData) {

  }

  async ngOnChanges(changes: SimpleChanges) {
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.enableButton = document.getElementById('enable');
    this.banButton = document.getElementById('banButton');
    this.model = null;
    this.changeEnableButton(this.selectedUser);
    this.initListOfRentedGames();
  }

  private changeEnableButton(user: UserData) {
    if (this.enableButton) {
      if (user.enabled) {
        this.enableButton.innerHTML = 'Disable account';
      } else {
        this.enableButton.innerHTML = 'Enable account';
      }
    }
  }

  async banOrUnBan() {
    this.selectedUser.banned = !this.selectedUser.banned;
    this.selectedUser.banUntil = null;
    this.userService.updateUserBanned(this.selectedUser).subscribe(() => {
      this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(user => {
        this.selectedUser = user;
        if (this.selectedUser.banned) {
          this.notifications.success('This account has been banned!');
        } else {
          this.notifications.success('This account was reactivated!');
        }
      }, reason => this.notifications.error(reason));
    }, error => this.notifications.error(error));
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.changeEnableButton(this.selectedUser);
  }

  onDateSelected() {
    this.banUntil = new Date(this.model.year, this.model.month - 1, this.model.day, 12, 0, 0);
    this.selectedUser.banUntil = this.banUntil;
    this.selectedUser.banned = true;
    this.userService.updateUserBanUntil(this.selectedUser).toPromise().then(() => {
      this.notifications.success('The user was banned until: ' + this.selectedUser.banUntil);
      console.log(this.banUntil.toLocaleString());
      // this.model = null;
      this.userService.getUserByEmail(this.selectedUser.email).subscribe(user => this.selectedUser = user);
    }, reason => {
      this.notifications.error(reason);
    });
  }

  async addPenalty() {
    // tslint:disable-next-line:max-line-length
    await this.userService.addOnePenalty(this.selectedUser).toPromise().then(() => this.notifications.success('Penalty added with success!'));
    await this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(user => this.selectedUser = user);
  }

  async makeAdmin() {
    // tslint:disable-next-line:max-line-length
    await this.userService.makeAdmin(this.selectedUser).toPromise().then(() => this.notifications.success('User has now admin rights!'));
    await this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(user => this.selectedUser = user);
  }

  async removePenalty(selectedUser: UserData, id: any) {
    // tslint:disable-next-line:max-line-length
    await this.userService.removeOnePenalty(this.selectedUser, id).toPromise().then(() => this.notifications.success('Penalty removed with success!'));
    await this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(user => this.selectedUser = user);
  }
}
