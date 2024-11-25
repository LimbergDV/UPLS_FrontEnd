import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrincipalComponent } from './view-principal/view-principal.component';
import { HeaderComponent } from './header/header.component';
import { PlatformInfoComponent } from './platform-info/platform-info.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ViewPrincipalComponent,
    HeaderComponent,
    PlatformInfoComponent,
    CollaboratorsComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class PrincipalModule {}
