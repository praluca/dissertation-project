import { Action, createReducer, on } from '@ngrx/store';
import { actionCoreLogin } from './core.actions';
import { coreFactory, ICoreState } from './core.state';

export const initialState = coreFactory();
const reducer = createReducer(
  initialState,
  on(actionCoreLogin, (state, { payload }) => ({
    ...state,
    loggedIn: false,
  }))
);

export function coreReducer(state: ICoreState | undefined, action: Action) {
  return reducer(state, action);
}
