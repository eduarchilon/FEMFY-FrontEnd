export interface QuestionsUserFamilyHistory {
  breastCancer?: number | null | undefined;
  earlyMenopause?: number | null | undefined;
  endometriosis?: number | null | undefined;
  id?: number | null | undefined;
  ovarianCancer?: number | null | undefined;
  sop?: number | null | undefined;
  userId?: number | null | undefined;
  uterineFibroids?: number | null | undefined;
}

export interface QuestionBasic {
  question: string;
  answer: any;
}

export const emptyQuestionHistoryResponse = (): QuestionsUserFamilyHistory => ({
  breastCancer: 0,
  earlyMenopause: 0,
  endometriosis: 0,
  ovarianCancer: 0,
  sop: 0,
  uterineFibroids: 0,
});
