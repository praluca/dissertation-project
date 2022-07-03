import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isHomePage: boolean = false;
  isConsultationsPage: boolean = false;
  isAppointmentsPage: boolean = false;
  isPaymentsPage: boolean = false;
  isVitalInformationsPage: boolean = false;
  isShopPage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.isHomePage = true;
    } else if (this.router.url === '/consultations') {
      this.isConsultationsPage = true;
    } else if (
      this.router.url === '/appointments' ||
      this.router.url === '/add-appointement'
    ) {
      this.isAppointmentsPage = true;
    } else if (this.router.url === '/payments') {
      this.isPaymentsPage = true;
    } else if (this.router.url === '/vital-informations') {
      this.isVitalInformationsPage = true;
    } else if (this.router.url === '/shop') {
      this.isShopPage = true;
    }
  }

  goToConsultations() {
    this.router.navigate(['/consultations']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  goToAppointments() {
    this.router.navigate(['/appointments']);
  }
  goToPayments() {
    this.router.navigate(['/payments']);
  }
  goToVitalInformations() {
    this.router.navigate(['/vital-informations']);
  }
  goToShop() {
    this.router.navigate(['/shop']);
  }
}
