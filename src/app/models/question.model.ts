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

export interface QuestionUserHormonal {
  another?: number;
  anotherDescription?: string;
  hyperprolactinemia?: number;
  hypothalamicDisorders?: number;
  hypothyroidism?: number;
  id?: number;
  insulinResistance?: number;
  polycysticOvarySyndrome?: number;
  prematureOvarianFailure?: number;
  sheehanSyndrome?: number;
  userId?: number;
}

export interface QuestionUserCongenital {
  another?: number;
  anotherDescription?: string;
  id?: number;
  malformationsUterine?: number;
  turnerSyndrome?: number;
  userId?: number;
}

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

export const emptyQuestionHormonalResponse = (): QuestionUserHormonal => ({
  another: 0,
  anotherDescription: '',
  hyperprolactinemia: 0,
  hypothalamicDisorders: 0,
  hypothyroidism: 0,
  insulinResistance: 0,
  polycysticOvarySyndrome: 0,
  prematureOvarianFailure: 0,
  sheehanSyndrome: 0,
});

export const emptyQuestionCongenitalResponse = (): QuestionUserCongenital => ({
  another: 0,
  anotherDescription: '',
  malformationsUterine: 0,
  turnerSyndrome: 0,
});
