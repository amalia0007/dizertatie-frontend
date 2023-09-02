import {Component, OnInit} from '@angular/core';
import {GameService} from 'src/app/services/game.service';
import {Game} from 'src/app/model/Game';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  title = 'rentals-app';
  value: string;
  games: Game[];
  filteredGames: Game[];

  constructor(private gameService: GameService) {
  }

  onBtnClick() {
    this.gameService.getGamesFromAPI(this.value).subscribe(filteredGames => this.games = filteredGames);
  }

  getGames() {
    this.gameService.getAllGames().subscribe(games => this.games = games);
  }

  ngOnInit(): void {
    this.getGames();
  }

}
