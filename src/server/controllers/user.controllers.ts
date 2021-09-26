import * as Express from 'express';
import bcrypt from 'bcrypt';

import {
  getUserByEmail,
  Maybe,
  User,
  removeUserPasswordField
} from '../db';

export const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const { email, password } = req.body;
  const user : Maybe<Partial<User>> = await getUserByEmail(email, {
    includePassword: true
  });
  if (bcrypt.compareSync(password, user?.password ?? '')) {
    if (req.session) {
      req.session.userId = user?.id;
    }
    res.status(200).json(removeUserPasswordField(user));
  }
  res.status(401).json({
    message: 'Failed to authenticate'
  });
};
