import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastFourDigits'
})
export class LastFourDigitsPipe implements PipeTransform {
  transform(value: number): string {
    const valueString = value.toString();
    if (valueString.length <= 4) {
      return valueString;
    } else {
      return valueString.slice(-4);
    }
  }
}
