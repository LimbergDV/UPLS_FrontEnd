import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { ViewComponent } from './view-form/view.component';



@NgModule({
  declarations: [
    FormLoginComponent,
    ViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
