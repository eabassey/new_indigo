import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(value: number): string {
    let paymentMethodString: string;
    switch (value) {
      case 1:
        paymentMethodString = 'Cash';
        break;
      case 2:
        paymentMethodString = 'Off Invoice';
        break;
      case 3:
        paymentMethodString = 'EFT';
        break;
      case 4:
        paymentMethodString = 'Credit Card';
          break;
      case 5:
        paymentMethodString = 'Access Bond';
        break;
      case 6:
        paymentMethodString = 'Transaction Account';
        break;
      case 7:
        paymentMethodString = 'Debit Card';
        break;
      case 8:
        paymentMethodString = 'Bond Account';
        break;
    }
    return paymentMethodString;
  }

}
