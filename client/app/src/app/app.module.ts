import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './modules/components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './modules/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/core.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './core/state/core.effects';
import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './modules/components/login/login.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { TopMenuComponent } from './modules/components/top-menu/top-menu.component';
import { ConsultationsComponent } from './modules/components/consultations/consultations.component';
import { AppointmentsComponent } from './modules/components/appointments/appointments.component';
import { PaymentsComponent } from './modules/components/payments/payments.component';
import { VitalInformationsComponent } from './modules/components/vital-informations/vital-informations.component';
import { ShopComponent } from './modules/components/shop/shop.component';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    TopMenuComponent,
    ConsultationsComponent,
    AppointmentsComponent,
    PaymentsComponent,
    VitalInformationsComponent,
    ShopComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([CoreEffects]),
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
