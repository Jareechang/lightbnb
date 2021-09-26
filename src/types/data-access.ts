import {
  User,
  Maybe
} from '.';

export interface IUserDataAccessInstance {
  create(
    name: string,
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  getByEmail(
    email: string
  ) : Promise<Maybe<User>>;

  getById(
    id: string
  ) : Promise<Maybe<User>>;
}

export interface IDataAccessInstances {
  user: IUserDataAccessInstance;
}
