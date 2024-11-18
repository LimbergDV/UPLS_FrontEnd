import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrincipalComponent } from './view-principal/view-principal.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    ViewPrincipalComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrincipalModule { }
