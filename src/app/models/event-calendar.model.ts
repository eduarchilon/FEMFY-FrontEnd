export interface EventCalendar {
  id?: number | string | any;
  idUser?: number;
  date?: Date | string | any;
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
