import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import {ResponsePageList} from '../model/ResponsePageList';
import {Game} from '../model/Game';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';
import {Subscription} from 'rxjs';
import {UserData} from '../model/UserData';

@Component({
  selector: 'app-admin-dashboard-games-table',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  subscriptionInit: Subscription;
  subscriptionPageGridChanged: Subscription;
  subscriptionInputSearchChanged: Subscription;
  paginatedGames: ResponsePageList<Game>;
  games: Game[];
  value: string;
  p: any;
  nrOfElements: number;
  addGameActivated: boolean;
  added: any;
  game: Game;
  selectedGame: Game;
  showDetailsGame: Game;
  selectedUser: UserData;
  switch: boolean;
  showUserTable = true;


  constructor(private gameService: GameService, private confirmationDialogService: ConfirmationDialogService) {
  }

  initListOfGames() {
    this.subscriptionInit = this.gameService.getPaginatedGames('id', 'ASC', '0', '5', '').subscribe(result => {
      this.paginatedGames = result;
      this.games = this.paginatedGames.pageList;
      this.selectedGame = this.games[0];
      this.nrOfElements = this.paginatedGames.nrOfElements;
    });
  }

  pageGridChanged(event) {
    this.p = event;
    if (this.value) {
      // tslint:disable-next-line:max-line-length
      this.subscriptionPageGridChanged = this.gameService.getPaginatedGames('id', 'ASC', (this.p - 1).toString(), '5', this.value).subscribe(p => {
        this.paginatedGames = p;
        this.games = this.paginatedGames.pageList;
        this.nrOfElements = this.paginatedGames.nrOfElements;
      });
    } else {
      this.subscriptionPageGridChanged = this.gameService.getPaginatedGames('id', 'ASC', (this.p - 1).toString(), '5', '').subscribe(p => {
        this.paginatedGames = p;
        this.games = this.paginatedGames.pageList;
        this.nrOfElements = this.paginatedGames.nrOfElements;
      });
    }

  }

  goToLast(page: number) {
    if (this.value) {
      this.gameService.getPaginatedGames('id', 'ASC', (page - 1).toString(), '5', this.value).toPromise().then(p => {
        this.paginatedGames = p;
        this.games = this.paginatedGames.pageList;
        this.nrOfElements = this.paginatedGames.nrOfElements;
        this.p = page;
      });
    } else {
      this.gameService.getPaginatedGames('id', 'ASC', (page - 1).toString(), '5', '').toPromise().then(p => {
        this.paginatedGames = p;
        this.games = this.paginatedGames.pageList;
        this.nrOfElements = this.paginatedGames.nrOfElements;
        this.p = page;
      });
    }

  }

  ngOnInit(): void {
    this.p = 1;
    this.initListOfGames();
  }

  inputSearchChanged() {
    this.subscriptionInputSearchChanged = this.gameService.getPaginatedGames('id', 'ASC', '0', '5', this.value).subscribe(
      p => {
        this.paginatedGames = p;
        this.games = this.paginatedGames.pageList;
        this.nrOfElements = this.paginatedGames.nrOfElements;
      }
    );
  }

  async deleteGame(game: Game) {
    await this.gameService.removeGame(game.id).toPromise();
    const nr = String(this.nrOfElements / 5);
    // tslint:disable-next-line:triple-equals
    if (this.nrOfElements % 5 == 0) {
      // tslint:disable-next-line:radix
      this.pageGridChanged(parseInt(nr));
    } else {
      // tslint:disable-next-line:radix
      this.pageGridChanged(parseInt(nr) + 1);
    }
  }

  async editGame(game: Game) {
    if (this.addGameActivated) {
      this.game = await this.gameService.getGameById(String(game.id)).toPromise();
      this.selectedGame = await this.gameService.getGameById(String(game.id)).toPromise();
    } else {
      this.changePanelButton();
      this.game = await this.gameService.getGameById(String(game.id)).toPromise();
      this.selectedGame = await this.gameService.getGameById(String(game.id)).toPromise();
    }
  }

  hideAndShow() {
    this.changePanelButton();
  }

  async eventCaptured(event: boolean) {
    this.added = event;
    if (this.added) {
      // tslint:disable-next-line:triple-equals
      if (this.nrOfElements % 5 == 0) {
        this.goToLast(this.p + 1);
      } else {
        this.goToLast(this.p);
      }
      this.addGameActivated = !this.addGameActivated;
      this.showUserTable = !this.showUserTable;
    } else {
      if (this.value) {
        this.paginatedGames = await this.gameService.getPaginatedGames('id', 'ASC', String(this.p - 1), '5', this.value).toPromise();
      } else {
        this.paginatedGames = await this.gameService.getPaginatedGames('id', 'ASC', String(this.p - 1), '5', '').toPromise();
      }

      this.games = this.paginatedGames.pageList;
      this.nrOfElements = this.paginatedGames.nrOfElements;
      this.selectedGame = await this.gameService.getGameById(String(this.game.id)).toPromise();
      this.addGameActivated = !this.addGameActivated;
      this.showUserTable = !this.showUserTable;
    }
  }

  addFlag() {
    if (this.addGameActivated) {
      this.p = (this.nrOfElements / 5) + 1;
      this.game = null;
    } else {
      this.changePanelButton();
      this.p = (this.nrOfElements / 5) + 1;
      this.game = null;
    }
  }

  deleteGameDialog(game: Game) {
    this.addGameActivated = false;
    this.confirmationDialogService.confirm('Please confirm delete', 'Do you really want to delete ?')
      .then((confirmed) => {
          if (confirmed) {
            this.deleteGame(game);
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  async showDetails(game: Game) {
    this.selectedGame = await this.gameService.getGameById(game.id.toString()).toPromise();
    this.game = this.selectedGame;
    this.switch = false;
  }

  async ratingDeleted(event) {
    if (event) {
      this.selectedGame = await this.gameService.getGameById(this.selectedGame.id.toString()).toPromise();
      this.game = await this.gameService.getGameById(this.selectedGame.id.toString()).toPromise();
    }
  }

  userCaptured(event: UserData) {
    this.selectedUser = event;
  }

  userEmitted(event: boolean) {
    this.switch = event;
  }

  changePanelButton() {
    const showPanel = document.getElementById('showPanel');
    this.addGameActivated = true;
    // this.showUserTable = !this.showUserTable;
    if (!this.showUserTable) {
      showPanel.innerHTML = 'Developer panel';
    }
  }
}
