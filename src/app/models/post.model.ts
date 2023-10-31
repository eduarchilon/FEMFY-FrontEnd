export interface Post {
    id?: number;
    title?: string;
    content?: string;
    createdDate?: Date | string;
    userId?: number;
    topicId?: number;
    username?: string;
    replies?: number;
  }
  