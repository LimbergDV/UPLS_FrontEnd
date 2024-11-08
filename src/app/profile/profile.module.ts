import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AvatarComponent } from './avatar/avatar.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { NavbarComponent } from '../navbar/navbar.component';



@NgModule({
  declarations: [
    ViewProfileComponent,
    AvatarComponent,
    PersonalInfoComponent,
    AccountInfoComponent,
    EditAvatarComponent,
    EditPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
