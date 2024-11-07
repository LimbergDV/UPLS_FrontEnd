import { NgModule } from '@angular/core';
import { FormLoginComponent } from './form-login/form-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    FormLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class LoginModule { }
