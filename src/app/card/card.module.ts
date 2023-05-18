
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardNumberDirective } from '../directive/card-number.directive';
import { LastFourDigitsPipe } from '../pipe/lastFourDigits.pipe';
import { CreditCardAsteriskPipe } from './../pipe/credit-card-asterisks.pipe';
import { CardService } from './../service/card.service';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbAccordionModule, NgbAlertModule],
  declarations: [CardComponent, CardListComponent, CardFormComponent, CardNumberDirective, LastFourDigitsPipe, CreditCardAsteriskPipe],
  exports: [CardComponent],
  providers: [CardService]
})
export class CardModule {}
