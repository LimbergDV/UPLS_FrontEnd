import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],exports: [FormRegisterComponent]
  
})
export class RegisterModule { }
