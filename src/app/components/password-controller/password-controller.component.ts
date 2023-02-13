import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-controller',
  templateUrl: `./password-controller.component.html`,
  styleUrls: [`./password-controller.component.css`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordControllerComponent,
      multi: true
    }
  ]
})

export class PasswordControllerComponent implements OnInit, ControlValueAccessor {
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });
  strength = '';

  constructor() { }

  ngOnInit(): void {
    this.checkPasswordStrength();
  }

  checkPasswordStrength() {

    // @ts-ignore
    const password = this.passwordForm.get('password').value;
    if (!password) {
      this.strength = '';
    }
    else if (password.length < 8 && password.length>=1) {
      this.strength = 'red';
    }
    else {
      let hasString = false;
      let hasNumber = false;
      let hasSymbol = false;

      for (let i = 0; i < password.length; i++) {
        if (/[a-z]/ || /[A-Z]/.test(password[i])) {
          hasString = true;
        }
        if (/[0-9]/.test(password[i])) {
          hasNumber = true;
        }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password[i])) {
          hasSymbol = true;
        }
      }

      if (hasString && hasNumber && hasSymbol) {
        this.strength = 'strong';
      }
      else if (hasString || hasNumber) {
        this.strength = 'medium';
      }
      else {
        this.strength = 'easy';
      }
    }
  }

  writeValue(obj: any): void {
    this.passwordForm.setValue({ password: obj });
  }

  registerOnChange(fn: any): void {
    this.passwordForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.passwordForm.disable() : this.passwordForm.enable();
  }
}
