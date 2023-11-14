import * as moment from 'moment';
import { DataPieChartChildren } from './data-pie-chart';

export interface Cycle {
  dateBeging?: Date | any | string;
  dateEnd?: Date | any | string;
  id?: number | null;
  idUser?: number;
  status?: string;
  daysOfBleeding?: number | any;
}

export const emptyCycle = (): Cycle => ({
  dateBeging: new Date(1992, 10, 10),
  dateEnd: '',
  id: null,
  idUser: 199992,
  status: '',
  daysOfBleeding: 0,
});

export interface CycleHistorial extends Cycle {
  lastTime?: Date | any;
  lastCycleDuration?: number;
  regular?: boolean;
  regularCycleDuration?: number;
  bleedingDuration?: number;
}

export interface FisrtCycle {
  initCycle?: Date | any;
  cycleDuration?: number | string | any;
  regularCycle?: number | string | any;
  dayOfBleding?: number | string | any;
}

export interface PredictionCycle {
  numberOvulation?: number | any; //dia en donde se seteara la ovulacion
  countNextPeriod?: number; //dias faltantes para el proximo periodo
  countRestOvuation?: number; //dias faltantes para la ovulacion
  countRestFertile?: number;
  dateNextPeriod?: moment.Moment | Date | any | string;
  period?: moment.Moment | Date | any | string;
}

export interface CyclePhaseState {
  statePhase?: DataPieChartChildren;
  ovulationNumber?: number;
}
