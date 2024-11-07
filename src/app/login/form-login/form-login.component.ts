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
    console.log(this.flag)
  }

  isDonee(): void {
    this.flag = true;
    console.log(this.flag)
  }
}
