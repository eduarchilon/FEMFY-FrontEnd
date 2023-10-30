export interface QuestionUserMenstruation {
  userId?: number;
  lastTime?: Date | any;
  lastCycleDuration?: number;
  regular?: boolean;
  regularCycleDuration?: number;
  bleedingDuration?: number;
  id?: number;
}

export interface QuestionBasic {
  question: string;
  answer: any;
}

export interface QuestionUserMenopause {
  aumentoDePeso?: boolean;
  changesInLibido?: boolean;
  changesInMenstrualCycle?: boolean;
  changesInSkinAndHair?: boolean;
  id?: number;
  lossOfBoneDensity?: boolean;
  moodChanges?: boolean;
  sleepingDifficulties?: boolean;
  suffocation?: boolean;
  userId?: number;
  vaginalDryness?: boolean;
}

export const emptyQuestionMenopausResponse = (): QuestionUserMenopause => ({
  aumentoDePeso: false,
  changesInLibido: false,
  changesInMenstrualCycle: false,
  changesInSkinAndHair: false,
  lossOfBoneDensity: false,
  moodChanges: false,
  sleepingDifficulties: false,
  suffocation: false,
  vaginalDryness: false,
});
