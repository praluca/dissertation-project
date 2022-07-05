import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  currentUserName = '';
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserName = this.localStorageService.get('user').name;
  }
  onDisplaySubscriptions() {
    this.router.navigate(['/subscription']);
  }
  onDisplaySpecialities() {
    this.router.navigate(['/specialities']);
  }
  onDisplayMeds() {
    this.router.navigate(['/med']);
  }
  logout() {
    this.localStorageService.remove('x-auth-token');
    this.localStorageService.remove('user');
    this.router.navigate(['/main-page']);
  }
}
