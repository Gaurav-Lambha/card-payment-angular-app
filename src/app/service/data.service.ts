import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private dataSubject: Subject<Object> = new Subject<Object>();

    // Method to emit data
    emitData(data: Object): void {
        this.dataSubject.next(data);
    }

    // Method to subscribe to data changes
    getData(): Observable<Object> {
        return this.dataSubject.asObservable();
    }
}
