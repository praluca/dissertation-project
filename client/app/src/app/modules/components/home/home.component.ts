import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentURL: string = '';
  doctors: any = [];
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.currentURL = this.router.url;
    this.apiService.getTop4Doctors().subscribe((response: any) => {
      this.doctors = response.doctorsProfiles;
    });
  }
}
