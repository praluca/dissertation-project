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
  categoryMap = [
    { category1: 'raceala' },
    { category2: 'raceala2' },
    { category3: 'raceala3' },
  ];
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
  initialProducts: any = [];
  initialProducts2: any = [];
  initialProducts3: any = [];
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((response: any) => {
      console.log('resp', response.products);
      this.products = response.products;
      this.initialProducts = response.products;
    });
    this.category.valueChanges.subscribe((response) => {
      console.log('RESPPP', response);
      if (
        response.category1 === true ||
        response.category2 === true ||
        response.category3 === true
      ) {
        this.products = this.products.filter((elem: any) =>
          response.category1 === true
            ? elem.category === 'raceala'
            : response.category2 === true
            ? elem.category === 'raceala2'
            : response.category3 === true
            ? elem.category === 'raceala3'
            : elem.category === 'raceala' &&
              elem.category === 'raceala2' &&
              elem.category === 'raceala3'
        );
      } else if (
        response.category1 === false &&
        response.category2 === false &&
        response.category3 === false
      ) {
        this.products = this.initialProducts;
      }
      this.initialProducts2 = this.products;
    });

    this.brand.valueChanges.subscribe((response) => {
      if (
        response.brand1 === true ||
        response.brand2 === true ||
        response.brand3 === true
      ) {
        this.products = this.products.filter((elem: any) =>
          response.brand1 === true
            ? elem.brand === 'Pharma'
            : response.brand2 === true
            ? elem.brand === 'Pharma2'
            : response.brand3 === true
            ? elem.brand === 'Pharma3'
            : elem.brand === 'Pharma' &&
              elem.brand === 'Pharma2' &&
              elem.brand === 'Pharma3'
        );
      } else if (
        response.brand1 === false &&
        response.brand2 === false &&
        response.brand3 === false
      ) {
        this.products = this.initialProducts2;
      }
      this.initialProducts3 = this.products;
    });
    this.price.valueChanges.subscribe((response) => {
      if (
        response.price1 === true ||
        response.price2 === true ||
        response.price3 === true
      ) {
        this.products = this.products.filter((elem: any) =>
          response.price1 === true
            ? elem.price < 50
            : response.price2 === true
            ? elem.price >= 50 && elem.price < 100
            : response.price3 === true
            ? elem.price > 100
            : elem.price <= 50 && elem.price > 50
        );
      } else if (
        response.price1 === false &&
        response.price2 === false &&
        response.price3 === false
      ) {
        this.products = this.initialProducts3;
      }
    });
  }
  onSearch() {
    console.log('search');
  }
  onSearchInput(event: any) {
    console.log(event);
    if (event.target.value.length > 3) {
      this.products = this.products.filter((elem: any) =>
        elem.productName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
    } else {
      this.products = this.initialProducts;
    }
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
    this.items = [];
    this.cartProducts.forEach((elem: any) => {
      this.items.push({ price: elem.product.priceId, quantity: elem.quantity });
    });
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
