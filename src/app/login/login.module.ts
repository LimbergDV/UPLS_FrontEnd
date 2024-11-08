import { NgModule } from '@angular/core';
import { FormLoginComponent } from './form-login/form-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FormLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class LoginModule { }
