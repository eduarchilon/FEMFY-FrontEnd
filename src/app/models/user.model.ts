//TODO: data_user
export interface UserLogin {
  user: string;
  password: string;
}

export interface UserResponse {
  birthdate?: Date | any;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  userName?: string;
  isSuscriptor?: boolean | number;
  idUser?: number;
  typeUserID?: number;
  localidad?: string;
  emotion?: string;
  friendsPhone?: string;
  friendsName?: string;
  friendsEmail?: string;
  state?: string;
}

export interface UserRequest extends UserResponse {
  password: string;
}

export interface UserDataCycle {
  userId?: number;
  idHistorial?: number;
  idMenstruation?: number;
  idMenopause?: number;
  idOther?: number;
  idHormonal?: number;
  idCongenital?: number;
}
