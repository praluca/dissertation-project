import { createAction, props } from '@ngrx/store';

export const actionCoreLogin = createAction(
  '[Core] Login',
  props<{ payload: any }>()
);
