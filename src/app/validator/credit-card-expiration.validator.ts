import { AbstractControl } from '@angular/forms';

export function creditCardExpirationValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  // Remove any whitespace from the input value
  const sanitizedValue = value.replace(/\s/g, '');

  // Check if the input value is a valid expiration date (MM/YY format)
  const isValidFormat = /^\d{2}\/\d{2}$/.test(sanitizedValue);

  if (!isValidFormat) {
    return { 'invalidFormat': true };
  }

  // Extract the month and year values
  const [month, year] = sanitizedValue.split('/').map(Number);

  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  // Check if the card has already expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { 'expired': true };
  }

  return null;
}
