import {
  User,
  Maybe
} from '.';

export interface IUserDataAccessInstance {
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
