import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../model/Game';
import {GameService} from '../../services/game.service';
import {ConfirmationDialogService} from '../../services/dialog-confirm/dialog-confirm.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {

  @Input() selectedGames: Game;
  @Output() ratingDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private gameService: GameService, private confirmationDialogService: ConfirmationDialogService) {
  }

  async deleteRating(i: number) {
    this.selectedGames.gameRatings.splice(i, 1);
    await this.gameService.addGame(this.selectedGames).toPromise();
    this.ratingDeleted.emit(true);
  }

  deleteGameDialog(i: number) {
    this.confirmationDialogService.confirm('Please confirm delete', 'Do you really want to delete ?')
      .then((confirmed) => {
          if (confirmed) {
            this.deleteRating(i);
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
