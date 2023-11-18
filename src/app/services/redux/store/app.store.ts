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
import { userDataReducer } from '../reducers/user-data.reducer';
import { cycleUserReducer } from '../reducers/cycle-user.reducer';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { questionUserMenstruationReducer } from '../reducers/question-menstruation.reducer';
import { Post } from 'src/app/models/post.model';
import { postReducer } from '../reducers/post.reducer';

export interface AppState {
  user: UserResponse;
  cycle: Cycle;
  idQuestionMenstruation: number | any;
  numberOvulation: any;
  cyclePhaseState: CyclePhaseState;
  predictionCycle: PredictionCycle;
  //NUEVO
  userData: UserResponse | any;
  cycleUser: Cycle | any;
  questionUserMenstruation: QuestionUserMenstruation | any;
  post: Post | any;
}

export const appStore: ActionReducerMap<AppState> = {
  user: loginReducers,
  cycle: cycleReducers,
  idQuestionMenstruation: questionMenstruationReducers,
  numberOvulation: dayOfOvulationReducers,
  cyclePhaseState: cyclePhaseStateReducers,
  predictionCycle: predictionReducers,
  //NUEVO
  userData: userDataReducer,
  cycleUser: cycleUserReducer,
  questionUserMenstruation: questionUserMenstruationReducer,
  post: postReducer,
};
