import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormsModule } from '@angular/forms'




@NgModule({
  declarations: [
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],exports: [FormRegisterComponent]
  
})
export class RegisterModule { }
