import { ActionReducerMap } from '@ngrx/store';
import { coreReducer } from './state/core.reducer';
import { ICoreState } from './state/core.state';

export interface AppState {
  core: ICoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  core: coreReducer,
};
