import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { actionCoreLogin } from '../core/state/core.actions';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store$: Store) {}

  public dispatchLogin(payload: any) {
    this.store$.dispatch(actionCoreLogin({ payload: payload }));
  }
}
