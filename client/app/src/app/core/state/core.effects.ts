import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actionCoreLogin } from './core.actions';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CoreEffects {
  constructor(private actions$: Actions<Action>) {}

  coreLoginEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionCoreLogin),
        tap((action) => {})
      ),
    { dispatch: false }
  );
}
