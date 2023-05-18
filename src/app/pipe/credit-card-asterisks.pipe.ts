import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardAsterisks'
})
export class CreditCardAsteriskPipe implements PipeTransform {
  transform(cardNumber: string): string {
    cardNumber = String(cardNumber);
    const visibleDigits = 4;
    const maskedDigits = cardNumber.length - visibleDigits * 2;
    const maskedPart = '*'.repeat(maskedDigits);
    const visiblePart = cardNumber.slice(0, visibleDigits) + maskedPart + cardNumber.slice(-visibleDigits);
    return visiblePart;
  }
}
