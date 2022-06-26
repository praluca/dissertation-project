import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private updateConsultationsTable = new BehaviorSubject(false);
  currentUpdateConsultationsTable =
    this.updateConsultationsTable.asObservable();

  constructor() {}

  updateConsTable(value: boolean) {
    this.updateConsultationsTable.next(value);
  }
}
