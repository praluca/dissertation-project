import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './modules/components/main-page/main-page.component';
import { RegisterComponent } from './modules/components/register/register.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
