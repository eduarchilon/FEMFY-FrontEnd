export interface EventCalendar {
  id?: number | string | any;
  idUser?: number;
  date?: Date;
  hour?: Date | string;
  description?: string;
  title?: string;
  isFriendWPVinculate?: boolean;
  isMyWPVinculate?: boolean;
}

export interface EventDay {
  hour?: Date | string;
  description?: string;
  title?: string;
}
