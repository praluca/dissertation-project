import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  searchText: any = '';
  displayedColumns: string[] = [
    'doctorName',
    'specialisation',
    'date',
    'hour',
    'state',
    'settings',
  ];
  dataSource: any;
  honoredAppointements = 0;
  futureAppointements = 0;
  unfulfilledAppointemets = 0;
  currentUserId = '';
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.localStorage.get('user')._id;
    this.apiService
      .getAppointements(this.currentUserId)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.appointements);
        console.log('response', response);
        response.appointements.forEach((element: any) => {
          if (element.state === 'viitoare') {
            this.futureAppointements++;
          } else if (element.state === 'onorata') {
            this.honoredAppointements++;
          } else {
            this.unfulfilledAppointemets++;
          }
        });
      });
  }
  onSearch() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  onSearchInput(event: any) {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  onAddAppointement() {
    this.router.navigate(['/add-appointement']);
  }
  deleteAppointement(elem: any) {
    this.apiService.deleteAppointement(elem._id).subscribe((response) => {
      this.honoredAppointements = 0;
      this.futureAppointements = 0;
      this.unfulfilledAppointemets = 0;
      this.apiService
        .getAppointements(this.currentUserId)
        .subscribe((resp: any) => {
          this.dataSource = new MatTableDataSource(resp.appointements);
          console.log('response', response);
          resp.appointements.forEach((element: any) => {
            if (element.state === 'viitoare') {
              this.futureAppointements++;
            } else if (element.state === 'onorata') {
              this.honoredAppointements++;
            } else {
              this.unfulfilledAppointemets++;
            }
          });
        });
    });
  }
}
