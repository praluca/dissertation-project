import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { AddWeightComponent } from 'src/app/shared/add-weight/add-weight.component';
import { ApiService } from 'src/app/shared/api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { UpdateService } from 'src/app/shared/update.service';

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
  currentUpdateWeightChart: Subscription = Subscription.EMPTY;

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private updateService: UpdateService
  ) {}
  // ngOnDestroy(): void {
  //   this.height = 0;
  //   this.weight = 0;
  //   this.bloodType = '';
  //   this.allergies = '';
  //   this.rh = '';
  //   this.weightHistory = [];
  //   this.tensionHistory = [];
  //   this.diastolicHistory = [];
  //   this.isEditingMode = false;
  // }
  info: any;
  hasNoData: boolean = false;
  ngOnInit(): void {
    this.currentUserId = this.localStorageService.get('user')._id;
    this.apiService
      .getVitalInformations(this.currentUserId)
      .subscribe((response: any) => {
        //console.log('response', response);
        if (response && Object.keys(response.vitalInformations).length !== 0) {
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
        } else {
          this.hasNoData = true;
        }
        console.log('weight', this.weight, this.isEditingMode);
      });
  }
  // addInfo() {
  //   this.isEditingMode = true;
  // }

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
  applyChanges() {
    let newInfo = {
      weight: this.weight,
      height: this.height,
      bloodType: this.bloodType,
      rh: this.rh,
      allergies: this.allergies,
    };
    if (this.hasNoData) {
      this.apiService
        .addVitalInformations(this.currentUserId, newInfo)
        .subscribe((response) => {
          this.isEditingMode = false;
        });
    } else {
      this.apiService
        .editVitalInformations(this.info._id, newInfo)
        .subscribe((response: any) => {
          this.isEditingMode = false;
        });
    }
  }
  addWeight(type: any) {
    let newInfo = {
      _id: this.info._id,
      weight: this.weight,
      height: this.height,
      bloodType: this.bloodType,
      rh: this.rh,
      allergies: this.allergies,
      weightHistory: this.weightHistory,
      sistolicTensionHistory: this.tensionHistory,
      diastolicTensionHistory: this.diastolicHistory,
    };
    const dialogRef = this.dialog.open(AddWeightComponent, {
      width: '450px',
      height: type === 'WEIGHT' ? '280px' : '400px',
      data: { data: newInfo, type: type },
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.currentUpdateWeightChart =
        this.updateService.currentUpdateWeightHistory.subscribe(
          (response: any) => {
            console.log('weight', response);
            if (type === 'WEIGHT') {
              this.weightHistory = response.weightHistory;
              this.weightChartOptions.series = [
                {
                  data: this.weightHistory,
                  type: 'area',
                  fillColor: '#DBDFFD',
                  fillOpacity: 0.5,
                  color: '#646FD4',
                },
              ];
            } else {
              this.tensionChartOptions.series = [
                {
                  data: response.sistolicTensionHistory,
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
                  data: response.diastolicTensionHistory,
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
            }

            this.updateFlag = true;
            console.log('tets', this.weightChartOptions);
          }
        );
    });
  }
}
