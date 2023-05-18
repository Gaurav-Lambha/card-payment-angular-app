import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from './card.model';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    cards: Card[] = [];
    baseURL = environment.cardMSServiceUrl;

    constructor(private http: HttpClient) { }

    getCards(): Observable<any> {
        const url = `${this.baseURL}/cards`;
        return this.http.get(url);
    }
    addCards(payload: Card): Observable<any> {
        const url = `${this.baseURL}/cards`;
        return this.http.post(url, payload);
    }
    updateCards(cardId: string, payload: Card): Observable<any> {
        const url = `${this.baseURL}/cards/${cardId}`;
        return this.http.put(url, payload);
    }
    deleteCards(cardId: string): Observable<any> {
        const url = `${this.baseURL}/cards/${cardId}`;
        return this.http.delete(url);
    }
}


// http://localhost:3000/api/cards/:id