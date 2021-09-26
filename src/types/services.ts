import { Maybe, User } from '.';

export interface UserService {
  signUp(
    name: string,
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  login(
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  getCurrentUser(
    id: string
  ) : Promise<Maybe<User>>;
}

export interface IServices {
  user: UserService;
}
