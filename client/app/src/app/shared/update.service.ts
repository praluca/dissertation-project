import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private updateConsultationsTable = new BehaviorSubject(false);
  currentUpdateConsultationsTable =
    this.updateConsultationsTable.asObservable();

  private updateWeightHistory = new BehaviorSubject({});
  currentUpdateWeightHistory = this.updateWeightHistory.asObservable();

  constructor() {}

  updateConsTable(value: boolean) {
    this.updateConsultationsTable.next(value);
  }

  updateWeightChart(value: any) {
    this.updateWeightHistory.next(value);
  }
}
