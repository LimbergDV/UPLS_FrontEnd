import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './login/form-login/form-login.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { FormRegisterComponent } from './register/form-register/form-register.component';
import { HomeComponent } from './home/home.component';
import { ViewMapComponent } from './maps/view-map/view-map.component';
import { ViewPublicationComponent } from './publications/view-publication/view-publication.component';
import { ViewSearchComponent } from './searches/view-search/view-search.component';
import { ViewChatComponent } from './chat/view-chat/view-chat.component';
import { ViewPrincipalComponent } from './principal/view-principal/view-principal.component';
import { AddPublicationComponent } from './publications/add-publication/add-publication.component';
import { DetailsPublicationComponent } from './publications/details-publication/details-publication.component';

const routes: Routes = [
  { path: 'signIn', component: FormLoginComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'signUp', component: FormRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'maps', component: ViewMapComponent },
  { path: 'publications', component: ViewPublicationComponent },
  { path: 'addPublication', component: AddPublicationComponent},
  { path: 'search', component: ViewSearchComponent },
  { path: 'chats', component: ViewChatComponent },
  { path: 'principal', component: ViewPrincipalComponent},
  { path: 'detailsPublications/:id', component: DetailsPublicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
