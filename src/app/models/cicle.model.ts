export interface Cycle {
  dateBeging?: Date | any | string;
  dateEnd?: Date | any | string;
  id?: number;
  idUser?: number;
  status?: string;
  daysOfBleeding?: number | any;
}

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
  numberOvulation: number; //dia en donde se seteara la ovulacion
  countNextPeriod: number; //dias faltantes para el proximo periodo
  countRestOvuation: number; //dias faltantes para la ovulacion
  countRestFertile: number;
}
