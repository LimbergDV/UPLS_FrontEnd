import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AvatarComponent } from './avatar/avatar.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    ViewProfileComponent,
    AvatarComponent,
    PersonalInfoComponent,
    AccountInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltip
  ]
})
export class ProfileModule { }
