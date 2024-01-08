import { Validators, AbstractControl } from '@angular/forms';

// Custom validator for number length
export const phoneNumberLengthValidator = (control: AbstractControl): { [key: string]: any } | null => {
  const value: string = control.value.toString(); // Convert the number to a string
  return value.length >= 11 ? null : { phoneNumberLength: true };
};
