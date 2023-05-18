import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { creditCardExpirationValidator } from '../../validator/credit-card-expiration.validator';

import { DataService } from '../../service/data.service';
import { Card } from '../../service/card.model';
import { CardService } from '../../service/card.service';


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  @Input() data: any;
  @Output() cardEvent = new EventEmitter<any>();
  cardForm: FormGroup;
  btnText = 'Add Your Card';
  constructor(private cardService: CardService, private dataService: DataService) { }

  ngOnInit(): void {
    this.setForm();
    if(this.data) {
      this.btnText = 'Update Your Card';
    }

  }

  setForm() {
    const nameValue = this.data && this.data.name ? this.data.name : '';
    const numberValue = this.data && this.data.number ? this.data.number : '';
    const expiryDateValue = this.data && this.data.expiryDate ? this.data.expiryDate : '';
    const disabledNumber = numberValue ? true : false;
    this.cardForm = new FormGroup({
      name: new FormControl(nameValue, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      number: new FormControl({value:numberValue, disabled: disabledNumber}, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(20),
      ]),
      expiryDate: new FormControl(expiryDateValue, [creditCardExpirationValidator]),
    });   
  }

  get name() {
    return this.cardForm.get('name')!;
  }

  get number() {
    return this.cardForm.get('number')!;
  }

  get expiryDate() {
    return this.cardForm.get('expiryDate')!;
  }

  onSave(): void {
    const card: Card = this.cardForm.value;
    this.cardService.addCards(card).subscribe({
      next: (response: any) => {
        console.log('cardSaveData:::', response);
        this.dataService.emitData(response);
        this.cardForm.reset();
      },
      error: (error: any) => {
        console.error('There was an error to save data on the server', error);
      }
    })
  }

  onUpdate(): void {
    const card: Card = this.cardForm.value;
    this.cardService.updateCards(this.data._id, card).subscribe({
      next: (response: any) => {
        this.cardEvent.emit(response);
      },
      error: (error: any) => {
        console.error('There was an error in deleting data from the server', error);
      }
    })
  }

  public validate(): void {
    if (this.cardForm.invalid) {
      for (const control of Object.keys(this.cardForm.controls)) {
        this.cardForm.controls[control].markAsTouched();
      }
      return;
    } else if (this.data) {
      this.onUpdate();
    } else {
      this.onSave();
    }
  }

}