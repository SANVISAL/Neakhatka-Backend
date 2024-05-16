export interface UserCreateRepository {
  username: string;
  email: string;
  password?: string;
  role: string;
  googleId?: string;
}

export interface UserUpdateRepository {
  username?: string;
  password?: string;
  role?: string;
  googleId?: string;
}
