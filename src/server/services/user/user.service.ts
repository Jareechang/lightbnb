import {
  Maybe,
  User,
  UserDataOptions,
  IUserDataAccessInstance,
} from '@app/types';
import {
  isPasswordValid,
  removeUserPasswordField,
} from './utils';

class UserService {
  private userDao: IUserDataAccessInstance;

  constructor(userDao: IUserDataAccessInstance) {
    this.userDao = userDao;
  }

  public async login(
    email: string,
    password: string
  ) : Promise<Maybe<User>> {
    const user : Maybe<User> = await this.findUser(email, {
      includePassword: true
    });
    const userPassword : string = user?.password ?? '';
    if (isPasswordValid(password, userPassword)) {
      return removeUserPasswordField(user);
    };
    return null;
  }

  public async getCurrentUser(
    id: string
  ) : Promise<Maybe<User>> {
    const user : Maybe<User> = await this.userDao.getById(id);
    return removeUserPasswordField(user);
  }

  /*
   *
   * **/
  private async findUser(
    email: string,
    options: UserDataOptions = {
      includePassword: false
    }
  ) : Promise<Maybe<User>> {
    const user : Maybe<User> = await this.userDao.getByEmail(email);
    if (options?.includePassword) return user;
    return removeUserPasswordField(user);
  }
}

export default UserService;
