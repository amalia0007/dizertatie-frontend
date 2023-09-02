import {Game} from './Game';
import {User} from './User';
import {Observable} from 'rxjs';

export class UserGame {
  id: number;
  user: User;
  game: Game;
  returnDate: string;
  generatedPenalty: boolean;

  constructor(user: User, game: Game, returnDate: string, generatedPenalty: boolean) {
    this.user = user;
    this.game = game;
    this.returnDate = returnDate;
    this.generatedPenalty = generatedPenalty;
  }

}
