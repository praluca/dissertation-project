import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-add-appointement',
  templateUrl: './add-appointement.component.html',
  styleUrls: ['./add-appointement.component.scss'],
})
export class AddAppointementComponent implements OnInit {
  selectedSpecialisation: any;
  selectedLocation: any;
  selectedDateValue: any;
  specialisations: any = [
    { value: 'Chirurgie', viewValue: 'CHIRURGIE' },
    { value: 'Pediatrie', viewValue: 'PEDIATRIE' },
    { value: 'Psihologie', viewValue: 'PSIHOLOGIE' },
    { value: 'Cardiologie', viewValue: 'CARDIOLOGIE' },
    { value: 'Radiologie', viewValue: 'RADIOLOGIE' },
  ];
  locations: any = [{ value: 'virtual', viewValue: 'CLINICA VIRTUALA' }];
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  responseArray: any = [];
  currentUserId: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.localStorage.get('user')._id;
  }
  selectedDate(change: any, event: any) {
    console.log(event.value);
    let dateObj = event.value;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    this.selectedDateValue = day + '/' + month + '/' + year;
    console.log('newdate', this.selectedDateValue);
  }
  searchAppointements() {
    let appSearch = {
      specialisation: this.selectedSpecialisation,
      location: this.selectedLocation,
      date: this.selectedDateValue,
    };
    this.responseArray = [];
    this.apiService
      .searchDoctorsAppointements(
        this.selectedSpecialisation,
        this.selectedLocation,
        this.selectedDateValue
      )
      .subscribe((response: any) => {
        this.responseArray = response.doctorsAppointement;
        console.log('ss', this.responseArray);
      });
  }
  selectHour(doctor: any, hour: any) {
    console.log('doctor', doctor, hour);
    let data = {
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorName,
      specialisation: this.selectedSpecialisation,
      location: this.selectedLocation,
      hour: hour,
      date: this.selectedDateValue,
      pacientId: this.currentUserId,
    };
    this.dialog.open(ConfirmationDialogComponent, {
      height: '220px',
      width: '400px',
      data: data,
    });
  }
}
