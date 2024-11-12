import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './login/form-login/form-login.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { FormRegisterComponent } from './register/form-register/form-register.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './maps/map/map.component';

const routes: Routes = [
  { path: 'signIn', component: FormLoginComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'signUp', component: FormRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'maps', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
