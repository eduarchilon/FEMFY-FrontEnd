export interface Post {
    id?: number | null;
    title?: string;
    content?: string;
    createdDate?: Date | string;
    userId?: number;
    topicId?: number;
    topicTitle?: string;
    username?: string;
    replies?: number | [];
  }
  