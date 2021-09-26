import {
  User,
  Maybe,
  IDatabase,
  IUserDataAccessInstance,
} from '@app/types';

import * as sql from './sql';

class UserDataAccess implements IUserDataAccessInstance {
  private database : IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  /*
   * Get user by their email
   *
   * @param {String} email - user’s email
   *
   * **/
  public async getByEmail(
    email: string
  ) : Promise<Maybe<User>> {
    let user : Maybe<User> = null;
    try {
      const { rows } = await this.database.query(
        sql.getUserByEmail,
        [email]
      );
      return rows[0];
    } catch (error) {
      console.error('UserDataAccess.getByEmail failed : ', error);
    }
    return user;
  }

  /*
   * Get user by their id
   *
   * @param {String} id - user id
   *
   * **/
  public async getById(
    id: string
  ) : Promise<Maybe<User>> {
    let user : Maybe<User> = null;
    if (!id) return user;
    try {
      const { rows } = await this.database.query(
        sql.getUserById,
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('UserDataAccess.getUserById failed : ', error);
    }
    return user;
  }
}

export default UserDataAccess;
