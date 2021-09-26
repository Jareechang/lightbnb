import { Maybe, User } from '.';

export interface UserService {
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
