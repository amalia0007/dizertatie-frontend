import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {StatusDataPoint} from '../../model/StatusDataPoint';
import {UserGameService} from '../../services/user-game.service';


@Component({
  selector: 'app-game-chart',
  templateUrl: './game-chart.component.html',
  styleUrls: ['./game-chart.component.css']
})
export class GameChartComponent implements OnInit {

  private dataPoints: StatusDataPoint[];

  constructor(private userGameService: UserGameService) {
  }

  async ngOnInit() {

    await this.userGameService.getStatusDataChart().toPromise().then(value => this.dataPoints = value);

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Games available',
        fontFamily: 'Abril Fatface',
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: Stock: {y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: this.dataPoints
      }]
    });

    chart.render();

  }

}
