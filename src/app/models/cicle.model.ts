export interface Cycle {
  dateBeging?: Date | any | string;
  dateEnd?: Date;
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
