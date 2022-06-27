import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/shared/api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-vital-informations',
  templateUrl: './vital-informations.component.html',
  styleUrls: ['./vital-informations.component.scss'],
})
export class VitalInformationsComponent implements OnInit {
  height: any = 0;
  weight: any = 0;
  bloodType: any = '';
  allergies: any = '';
  rh: any = '';
  Highcharts: typeof Highcharts = Highcharts;
  weightChartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      backgroundColor: '#f9f9f9',
      height: 300,
    },
    lang: {
      noData: 'Nu exista date',
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
  };
  tensionChartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      backgroundColor: '#f9f9f9',
      height: 300,
    },
    lang: {
      noData: 'Nu exista date',
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
  };
  weightHistory: any = [];
  tensionHistory: any = [];
  diastolicHistory: any = [];
  currentUserId: any;
  updateFlag = false;
  isEditingMode = false;
  rhValues = [
    { value: 'pozitiv', viewValue: 'pozitiv' },
    { value: 'negativ', viewValue: 'negativ' },
  ];
  bloodTypes = [
    { value: '0', viewValue: '0' },
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'AB', viewValue: 'AB' },
  ];

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {}
  info: any;
  ngOnInit(): void {
    this.currentUserId = this.localStorageService.get('user')._id;
    this.apiService
      .getVitalInformations(this.currentUserId)
      .subscribe((response: any) => {
        this.info = response.vitalInformations;
        console.log('resp', this.info.weightHistory);
        this.weight = this.info.weight;
        this.weightHistory = this.info.weightHistory;
        this.height = this.info.height;
        this.rh = this.info.rh;
        this.bloodType = this.info.bloodType;
        this.allergies = this.info.allergies;
        this.tensionHistory = this.info.sistolicTensionHistory;
        this.diastolicHistory = this.info.diastolicTensionHistory;

        this.weightChartOptions.series = [
          {
            data: this.weightHistory,
            type: 'area',
            fillColor: '#DBDFFD',
            fillOpacity: 0.5,
            color: '#646FD4',
          },
        ];
        this.tensionChartOptions.series = [
          {
            data: this.tensionHistory,
            type: 'area',
            fillColor: '#DBDFFD',
            fillOpacity: 0.5,
            color: '#646FD4',
            tooltip: {
              pointFormatter: function () {
                return (
                  'Data: <b>' +
                  this.x +
                  '</b> <br/> Tensiunea sistolica: <b>' +
                  this.y +
                  '</b>'
                );
              },
            },
          },
          {
            data: this.diastolicHistory,
            type: 'area',
            fillColor: '#FD5D5D',
            fillOpacity: 0.3,
            color: '#FF0000',
            tooltip: {
              pointFormatter: function () {
                return (
                  'Data: <b>' +
                  this.x +
                  '</b> <br/> Tensiunea diastolica: <b>' +
                  this.y +
                  '</b>'
                );
              },
            },
          },
        ];

        this.updateFlag = true;
      });
  }
  addInfo() {
    this.isEditingMode = true;
  }

  modifyInfo() {
    this.isEditingMode = true;
  }
  cancel() {
    this.weight = this.info.weight;
    this.height = this.info.height;
    this.rh = this.info.rh;
    this.bloodType = this.info.bloodType;
    this.allergies = this.info.allergies;
    this.isEditingMode = false;
  }
}
