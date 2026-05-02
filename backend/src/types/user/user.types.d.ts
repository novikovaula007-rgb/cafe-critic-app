export interface UserFields {
  email: string;
  displayName: string;
  password?: string;
  role: string;
  refreshToken?: string;
}

export type UserSave = Omit<UserFields, 'role'>;
export type UserReg = Omit<UserFields, 'role' | 'refreshToken'>;