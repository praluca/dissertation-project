import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-vital-informations',
  templateUrl: './vital-informations.component.html',
  styleUrls: ['./vital-informations.component.scss'],
})
export class VitalInformationsComponent implements OnInit {
  height: any = 158;
  weight: any = 50;
  bloodType: any = 'A';
  allergies: any = 'ceva, altceva, aksfmsl';
  rh: any = 'pozitiv';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      backgroundColor: '#f9f9f9',
      height: 300,
    },
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      formatter: function () {
        return (
          'Data: <b>' + this.x + '</b> <br/> Greutate: <b>' + this.y + '</b>'
        );
      },
    },
    series: [
      {
        data: [50, 45, 55, 60, 20, 45, 56],
        type: 'area',
        fillColor: '#DBDFFD',
        fillOpacity: 0.5,
        color: '#646FD4',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
