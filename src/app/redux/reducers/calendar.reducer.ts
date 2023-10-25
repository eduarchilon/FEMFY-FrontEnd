import { createReducer, on } from '@ngrx/store';
import { setDayOfOvulation } from '../actions/calendar.action';

export const initialNumberOvulation: { numberOvulation: number } = {
  numberOvulation: 0,
};

export const dayOfOvulationReducers = createReducer(
  initialNumberOvulation,
  on(setDayOfOvulation, (state, { numberOvulation }) => ({
    ...state,
    numberOvulation,
  }))
);
