import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {UserGameService} from '../../services/user-game.service';
import {ChartDataPoint} from '../../model/ChartDataPoint';


@Component({
  selector: 'app-rent-chart',
  templateUrl: './rent-chart.component.html',
  styleUrls: ['./rent-chart.component.css']
})
export class RentChartComponent implements OnInit {
  //
  // private dataPoints: ChartDataPoint[];
  //
  // constructor(private userGameService: UserGameService) {
  // }
  //
  //
  // async ngOnInit() {
  //
  //   await this.userGameService.getDataChart().toPromise().then(value => this.dataPoints = value);
  //
  //   const chart = new CanvasJS.Chart('chartContainer', {
  //     animationEnabled: true,
  //     exportEnabled: true,
  //     axisX: {
  //       labelAngle: -80,
  //       labelFontSize: 14,
  //       labelAutoFit: true,
  //       titleFontWeight: 'bold',
  //     },
  //     axisY: {
  //       labelAngle: 0,
  //       labelFontSize: 14,
  //       labelAutoFit: true,
  //       titleFontWeight: 'bold',
  //     },
  //     title: {
  //       text: 'Currently played',
  //       fontFamily: 'Abril Fatface',
  //     },
  //     data: [{
  //       type: 'column',
  //       dataPoints: this.dataPoints
  //     }]
  //   });
  //
  //   chart.render();
  //
  // }

  private dataPoints: ChartDataPoint[];

  constructor(private userGameService: UserGameService) {
  }

  async ngOnInit() {

    // const dataPoints = [];

    await this.userGameService.getDataChart().toPromise().then(value => this.dataPoints = value);


    // let y = 0;
    // for (let i = 0; i < 10000; i++) {
    //   y += Math.round(5 + Math.random() * (-5 - 5));
    //   dataPoints.push({y});
    // }
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ''
      },
      subtitles: [{
        text: 'Rental popularity'
      }],
      data: [
        {
          type: 'line',
          dataPoints: this.dataPoints
        }]
    });

    chart.render();
  }

}
