import Database from '../db-connection';
import * as sql from './sql';
import * as utils from './utils';
import { User, Maybe, UserDataOptions } from './types';

export const getUserByEmail = async(
  email: string,
  options: UserDataOptions = {
    includePassword: false
  }
) : Promise<Maybe<Partial<User>>> => {
  let user : Maybe<User> = null;
  try {
    const { rows } = await Database.query(
      sql.getUserByEmail,
      [email]
    );
    const user = rows[0];
    return options?.includePassword
      ? user
      : utils.removeUserPasswordField(user);
  } catch (error) {
    console.error('getUserByEmail failed -> ', error);
  }

  return user;
}
