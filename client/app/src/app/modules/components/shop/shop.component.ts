import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/shared/api.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  panelOpenState = true;
  panelOpenState2 = true;
  category = this._formBuilder.group({
    category1: false,
    category2: false,
    category3: false,
  });
  brand = this._formBuilder.group({
    brand1: false,
    brand2: false,
    brand3: false,
  });
  price = this._formBuilder.group({
    price1: false,
    price2: false,
    price3: false,
  });
  searchText: any = '';
  isClick = false;
  products: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((response: any) => {
      console.log('resp', response.products);
      this.products = response.products;
    });
  }
  onSearch() {
    console.log('search');
  }
  onSearchInput(event: any) {
    console.log('search input');
  }
  buildProductPicture(picture: string) {
    let imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64' + picture
    );
    return imagePath;
  }
  stripePromise = loadStripe(
    'pk_test_51Id8NGGHLl6GfasoAkbv3ZDMCWy1YkcFhlJFc7UHwJoJPa2lFR4JJSf9Lo0HoHthXetplGOsD3nCcQrPaRmishs700p2eT3sx4'
  );
  cartProducts: any = [];
  removeItem(index: any) {
    this.cartProducts.splice(index, 1);
  }
  items: any = [];
  addToCart(prod: any) {
    console.log(prod);
    if (this.cartProducts.length > 0) {
      if (
        this.cartProducts.every(
          (elem: any) => elem.product.productName !== prod.productName
        )
      ) {
        this.cartProducts.push({ product: prod, quantity: 1 });
      } else {
        this.cartProducts.forEach((element: any, index: any) => {
          if (prod.productName === element.product.productName) {
            element.quantity++;
          }
        });
      }
    } else {
      this.cartProducts.push({ product: prod, quantity: 1 });
    }
    this.items = [];
    this.cartProducts.forEach((elem: any) => {
      this.items.push({ price: elem.product.priceId, quantity: elem.quantity });
    });
    console.log('items', this.items);
  }

  dispCart = false;
  displayCart() {
    this.dispCart = !this.dispCart;
  }
  async checkout() {
    const stripe = await this.stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      mode: 'payment',
      lineItems: this.items,
      successUrl: `${window.location.href}/shop`,
      cancelUrl: `${window.location.href}/failure`,
    });

    if (error) {
      console.log(error);
    }
  }
}
