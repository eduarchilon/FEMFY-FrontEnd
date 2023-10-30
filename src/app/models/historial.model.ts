export interface QuestionsUserFamilyHistory {
  breastCancer?: boolean,
  earlyMenopause?: boolean,
  endometriosis?: boolean,
  id?: number,
  ovarianCancer?: boolean,
  sop?: boolean,
  userId?: number,
  uterineFibroids?: boolean
}

export interface QuestionBasic {
  question: string;
  answer: any;
}

export const emptyQuestionHistoryResponse = (): QuestionsUserFamilyHistory => ({
  breastCancer: false,
  earlyMenopause: false,
  endometriosis: false,
  ovarianCancer: false,
  sop: false,
  uterineFibroids: false
});
