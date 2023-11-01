export interface RecommendationsByFamilyHistory {
  ageReference?: number | any;
  description?: string | any;
  expirationDays?: number | any;
  idRecommendation?: number | any;
  typeDisease?: string | any;
}

export interface RecommendationsByDocuments
  extends RecommendationsByFamilyHistory {}

export interface RecommendationsByTypeUser
  extends RecommendationsByFamilyHistory {}

export interface Recomendations {
  recommendationsByFamilyHistory?: RecommendationsByFamilyHistory[];
  recommendationsByDocuments?: RecommendationsByDocuments[];
  recommendationsByTypeUser?: RecommendationsByTypeUser[];
}
