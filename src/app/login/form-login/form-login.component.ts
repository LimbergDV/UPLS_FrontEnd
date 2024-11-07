import { Component } from '@angular/core';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  flag: boolean = true;

  isDonor(): void {
    this.flag = false;
  }

  isDonee(): void {
    this.flag = true;
  }
}
