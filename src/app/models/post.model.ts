export interface Post {
    id?: number | null;
    title?: string;
    content?: string;
    createdDate?: Date | string;
    userId?: number;
    topicId?: number;
    username?: string;
    replies?: number | [];
  }
  