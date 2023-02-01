import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-controller',
  templateUrl: './password-controller.component.html',
  styleUrls: ['./password-controller.component.css']
})


export class PasswordControllerComponent implements OnInit {
  password = '';
  strength = '';

  constructor() {
  }

  ngOnInit(): void {
    this.checkPasswordStrength();
  }

  checkPasswordStrength() {
    if (!this.password) {
      this.strength = '';
    }
    else if (this.password.length < 8 && this.password.length>=1) {
      this.strength = 'red';
    }
    else {
      let hasString = false;
      let hasNumber = false;
      let hasSymbol = false;

      for (let i = 0; i < this.password.length; i++) {
        if (/[a-z]/ || /[A-Z]/.test(this.password[i])) {
          hasString = true;
        }
        if (/[0-9]/.test(this.password[i])) {
          hasNumber = true;
        }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.password[i])) {
          hasSymbol = true;
        }
      }

      if (hasString && hasNumber && hasSymbol) {
        this.strength = 'strong';
      }
      else if (hasString && hasSymbol || hasString && hasNumber || hasSymbol && hasNumber) {
        this.strength = 'medium';
      }
      else {
        this.strength = 'easy';
      }
    }
  }
}
