import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoreState } from './core.state';

export const selectCoreState = createFeatureSelector<ICoreState>('core');

export const selectCoreAppState = createSelector(
  selectCoreState,
  (coreState) => coreState
);
