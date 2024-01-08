import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidators: { [key: string]: ValidatorFn } = {
  PasswordTooShort: (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    return value && value.length >= 8 ? null : { PasswordTooShort: true };
  },
  PasswordRequiresNonAlphanumeric: (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = /[^\w\d]/; // checks for non-alphanumeric character
    return value && regex.test(value) ? null : { PasswordRequiresNonAlphanumeric: true };
  },
  PasswordRequiresDigit: (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = /\d/; // checks for at least one digit
    return value && regex.test(value) ? null : { PasswordRequiresDigit: true };
  },
  PasswordRequiresUpper: (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = /[A-Z]/; // checks for at least one uppercase letter
    return value && regex.test(value) ? null : { PasswordRequiresUpper: true };
  },
  PasswordRequiresLower: (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = /[a-z]/; // checks for at least one lowercase letter
    return value && regex.test(value) ? null : { PasswordRequiresLower: true };
  }
};