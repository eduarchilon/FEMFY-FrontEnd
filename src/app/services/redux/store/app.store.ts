import { ActionReducerMap } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { loginReducers } from '../reducers/login.reducer';
import {
  Cycle,
  CyclePhaseState,
  PredictionCycle,
} from 'src/app/models/cicle.model';
import {
  cyclePhaseStateReducers,
  cycleReducers,
  predictionReducers,
} from '../reducers/cycle.reduce';
import { dayOfOvulationReducers } from '../reducers/calendar.reducer';
import { questionMenstruationReducers } from '../reducers/question.reducer';

export interface AppState {
  user: UserResponse;
  cycle: Cycle;
  idQuestionMenstruation: number | any;
  numberOvulation: any;
  cyclePhaseState: CyclePhaseState;
  predictionCycle: PredictionCycle;
}

export const appStore: ActionReducerMap<AppState> = {
  user: loginReducers,
  cycle: cycleReducers,
  idQuestionMenstruation: questionMenstruationReducers,
  numberOvulation: dayOfOvulationReducers,
  cyclePhaseState: cyclePhaseStateReducers,
  predictionCycle: predictionReducers,
};
