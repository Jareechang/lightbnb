import * as Express from 'express';

import {
  Maybe,
  User,
  IServices,
  UserService,
} from '@app/types';

/*
 *
 *
 * **/
export const withUserServices = (
  func: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => any,
  services: IServices
) => {
  return func.bind({ userService: services.user });
}

export class UserController {
  private userService: UserService;

  public async signUp(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    const { name, email, password } = req.body;
    const user : Maybe<User> = await this.userService.signUp(
      name,
      email,
      password,
    );
    if (!user) {
      return res.status(401).json({
        message: 'Failed to authenticate'
      });
    }
    return res.status(200).json(user);
  }

  public async login(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    const { email, password } = req.body;
    const user : Maybe<User> = await this.userService.login(
      email,
      password,
    );
    if (!user) {
      return res.status(401).json({
        message: 'Failed to authenticate'
      });
    }
    if (req.session) {
      req.session.userId = user?.id;
    }
    return res.status(200).json(user);
  }

  public async currentUser(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    const userId : string = req?.session?.userId ?? '';
    const user : Maybe<User> = await this.userService.getCurrentUser(
      userId
    );
    if (!user) {
      return res.status(401).json({
        message: 'Authentication Failed, Please login.'
      });
    }
    return res.status(200).json(user);
  }

  public logout(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    if (req.session) {
      req.session.userId = null;
    }
    res.status(200).json({});
  }
}
