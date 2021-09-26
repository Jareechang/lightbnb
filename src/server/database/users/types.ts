export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserDataOptions {
  includePassword: boolean;
}

export type Maybe<T> = T | null;

