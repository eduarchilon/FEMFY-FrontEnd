export interface QuestionUserMenstruation {
  userId?: number;
  lastTime?: Date | any;
  lastCycleDuration?: number;
  regular?: boolean;
  regularCycleDuration?: number;
  bleedingDuration?: number;
  id?: number;
}

export interface QuestionUserMenopause {
  aumentoDePeso?: number;
  changesInLibido?: number;
  changesInMenstrualCycle?: number;
  changesInSkinAndHair?: number;
  id?: number;
  lossOfBoneDensity?: number;
  moodChanges?: number;
  sleepingDifficulties?: number;
  suffocation?: number;
  userId?: number;
  vaginalDryness?: number;
}

export interface QuestionUserOther {}

export interface QuestionUserOtherHormonal {}

export interface QuestionUserOtherCongenital {}

export interface QuestionBasic {
  question: string;
  answer: any;
}

export const emptyQuestionMenopauseResponse = (): QuestionUserMenopause => ({
  aumentoDePeso: 0,
  changesInLibido: 0,
  changesInMenstrualCycle: 0,
  changesInSkinAndHair: 0,
  lossOfBoneDensity: 0,
  moodChanges: 0,
  sleepingDifficulties: 0,
  suffocation: 0,
  vaginalDryness: 0,
});
