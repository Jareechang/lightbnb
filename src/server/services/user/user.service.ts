import {
  Maybe,
  User,
  IUserDataAccessInstance,
} from '@app/types';
import bcrypt from 'bcrypt';
import {
  isPasswordValid,
  removeUserPasswordField,
} from './utils';

class UserService {
  private userDao: IUserDataAccessInstance;

  constructor(userDao: IUserDataAccessInstance) {
    this.userDao = userDao;
  }

  public async signUp(
    name: string,
    email: string,
    password: string
  ) : Promise<Maybe<User>> {
    const encryptedPassword : string = bcrypt.hashSync(password, 12);
    const user : Maybe<User> = await this.userDao.create(
      name,
      email,
      encryptedPassword
    );
    return user;
  }

  public async login(
    email: string,
    password: string
  ) : Promise<Maybe<User>> {
    const user : Maybe<User> = await this.userDao.getByEmail(email);
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
}

export default UserService;
