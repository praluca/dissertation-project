import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './modules/components/appointments/appointments.component';
import { ConsultationsComponent } from './modules/components/consultations/consultations.component';
import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './modules/components/main-page/main-page.component';
import { PaymentsComponent } from './modules/components/payments/payments.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { ShopComponent } from './modules/components/shop/shop.component';
import { VitalInformationsComponent } from './modules/components/vital-informations/vital-informations.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'consultations', component: ConsultationsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'vital-informations', component: VitalInformationsComponent },
  { path: 'shop', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
