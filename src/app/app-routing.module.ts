import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './login/form-login/form-login.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { FormRegisterComponent } from './register/form-register/form-register.component';

const routes: Routes = [
  { path: '', component: FormLoginComponent },
  {path:'profile', component: ViewProfileComponent},
  {path: 'signUp', component: FormRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
