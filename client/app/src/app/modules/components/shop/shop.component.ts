import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  panelOpenState = true;
  panelOpenState2 = true;
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  searchText: any = '';
  isClick = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  onSearch() {
    console.log('search');
  }
  onSearchInput(event: any) {
    console.log('search input');
  }
}
