//TODO: data_user
export interface UserLogin {
  user: string;
  password: string;
}

export interface UserResponse {
  birthday: Date | any;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  userName: string;
  isSuscripto: boolean;
  id: string;
}

export const emptyUserResponse = (): UserResponse => ({
  birthday: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  avatar: '',
  userName: '',
  isSuscripto: false,
  id: '',
});
