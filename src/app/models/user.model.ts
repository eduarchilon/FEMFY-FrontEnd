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
  avatar?: string;
  userName?: string;
  isSuscripto?: boolean;
  id?: number;
  idUser?: number;
}

export interface UserRequest extends UserResponse {
  password: string;
}

export const emptyUserResponse = (): UserResponse => ({
  birthdate: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  avatar: '',
  userName: '',
  isSuscripto: false,
});
