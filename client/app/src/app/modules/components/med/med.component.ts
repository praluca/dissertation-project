import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-med',
  templateUrl: './med.component.html',
  styleUrls: ['./med.component.scss'],
})
export class MedComponent implements OnInit {
  doctors: any = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getTop4Doctors().subscribe((response: any) => {
      this.doctors = response.doctorsProfiles;
    });
  }
  goToAppointements() {
    this.router.navigate(['/add-appointement']);
  }
}
