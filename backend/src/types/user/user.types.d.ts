export interface User {
  email: string;
  displayName: string;
  password: string;
  role: string;
  refreshToken: string;
}

export type UserSave = Omit<User, 'role'>;
export type UserReg = Omit<User, 'role' | 'refreshToken' | 'googleID'>;