export interface EventCalendar {
  id?: number;
  idUser?: number;
  date?: Date;
  hour?: Date | string;
  description?: string;
  title?: string;
}

export interface EventDay {
  hour?: Date | string;
  description?: string;
  title?: string;
}
