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

export const emptyQuestionMenstruationResponse = (): QuestionUserMenstruation => ({
  lastTime: "",
  lastCycleDuration: 0,
  regular: false,
  regularCycleDuration:0,
  bleedingDuration:0,
});
