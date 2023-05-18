import { CardService } from './../../service/card.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy  {
  cardData: any[];
  updateCardData: any;
  selectedIndex: any;
  dataSubscription: Subscription;
  constructor(private cardService: CardService, private dataService: DataService) {
    this.dataSubscription = this.dataService.getData().subscribe((data) => {  
      if(Object.keys(data).length) {
        this.cardData.unshift(data);
      }    
    });
   }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.cardService.getCards().subscribe({
      next: (response: any) => {
        this.cardData = response;
        console.log('cardData:::', this.cardData);
      },
      error: (error: any) => {
        console.error('There was an error in retrieving data from the server', error);
      }
    })
  }

  onDeleteCard(cardId:string): void {
    this.cardService.deleteCards(cardId).subscribe({
      next: (response: any) => {        
        this.cardData = this.cardData.filter(e => e._id !== cardId);
      },
      error: (error: any) => {
        console.error('There was an error in deleting data from the server', error);
      }
    })
  }

  onUpdateCard(data: any, index: number): void {
    console.log('UpdatedInput', data);
    this.updateCardData = data;   
    this.selectedIndex = index;
  }

  onCardEvent(data: any) {
    console.log('UpdatedData::', data);
    this.cardData[this.selectedIndex] = data; 
    this.resetValue();   
  }

  resetValue() {
    this.selectedIndex = '';
    this.updateCardData = null;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}