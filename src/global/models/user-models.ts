export interface SignIn {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUp {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  emailAddress: string;
}

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  roles: string[];
  active: boolean;
}

export interface UserResponseWithToken {
  user: UserResponse;
  token: string;
}

export interface User extends UserResponse {}
