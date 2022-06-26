import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  currentUserName = '';
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.currentUserName = this.localStorageService.get('user').name;
  }
}
