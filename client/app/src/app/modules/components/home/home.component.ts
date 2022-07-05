import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
// import uuidv4 from 'uuid/dist/v4';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentURL: string = '';
  doctors: any = [];
  futureAppointements: any = [];
  currentUserId: any;
  currentDate = new Date();
  constructor(
    private router: Router,
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.localStorage.get('user')._id;
    this.currentURL = this.router.url;
    this.apiService.getTop4Doctors().subscribe((response: any) => {
      this.doctors = response.doctorsProfiles;
    });
    this.apiService
      .getAppointements(this.currentUserId)
      .subscribe((response: any) => {
        console.log('RESP', response);
        this.futureAppointements = response.appointements.filter(
          (elem: any) =>
            this.currentDate.getTime() < new Date(elem.date).getTime()
        );
        console.log('ff', this.futureAppointements);
      });
  }
  goToAppointements() {
    this.router.navigate(['/add-appointement']);
  }
  goToRoom() {
    this.router.navigate(['/room']);
  }
}
