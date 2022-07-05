import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointementComponent } from './modules/components/add-appointement/add-appointement.component';
import { AppointmentsComponent } from './modules/components/appointments/appointments.component';
import { ConsultationsComponent } from './modules/components/consultations/consultations.component';
import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './modules/components/main-page/main-page.component';
import { MedComponent } from './modules/components/med/med.component';
import { PaymentsComponent } from './modules/components/payments/payments.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { ShopComponent } from './modules/components/shop/shop.component';
import { SpecialitiesComponent } from './modules/components/specialities/specialities.component';
import { SubscriptionComponent } from './modules/components/subscription/subscription.component';
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
  { path: 'add-appointement', component: AddAppointementComponent },
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
  {
    path: 'specialities',
    component: SpecialitiesComponent,
  },
  {
    path: 'med',
    component: MedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
