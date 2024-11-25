import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterModule } from './register/register.module';
import { RouterModule } from '@angular/router';
import { MapsModule } from './maps/maps.module';
import { PublicationsModule } from './publications/publications.module';
import { SearchesModule } from './searches/searches.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltip } from '@angular/material/tooltip';
import { ChatModule } from './chat/chat.module';
import { PrincipalModule } from './principal/principal.module';


@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProfileModule,
    HttpClientModule,
    RegisterModule,
    RouterModule,
    MapsModule,
    PublicationsModule,
    SearchesModule,
    MatTooltip,
    ChatModule,
    PrincipalModule
  ],

  providers: [provideAnimationsAsync(), ChatModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
