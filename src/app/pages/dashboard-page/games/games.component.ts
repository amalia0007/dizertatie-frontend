import {Component, OnInit} from '@angular/core';
import {Game} from 'src/app/model/Game';
import {GameService} from 'src/app/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  title = 'rentals-app';
  games: Game[];
  filteredGames: Game[];
  value: string;

  constructor(private gameService: GameService) {
  }

  getGames() {
    this.gameService.getAllGames().subscribe(games => this.games = games);
  }

  ngOnInit(): void {
    this.getGames();
  }

}
