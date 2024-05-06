export interface UserCreateRepository {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
  googleId?: string;
}

export interface UserUpdateRepository {
  firstname?: string;
  lastname?: string;
  password?: string;
  role: string;
  googleId?: string;
}
