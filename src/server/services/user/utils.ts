import bcrypt from 'bcrypt';
import { Maybe, User } from '@app/types';

/*
 * Remove the password field from the object
 *
 * **/
export const removeUserPasswordField = (
  user: Maybe<User>
) : Maybe<User> => {
  if (!user) return null;
  return Object.keys(user)
    .reduce((acc, key) => {
      if (key !== 'password') {
        acc[key] = user[key];
      }
      return acc;
    }, ({} as User));
}

/*
 * Check if password input matches with existing password
 *
 * **/
export const isPasswordValid = (
  passwordInput: string,
  password: string
) : boolean => {
  return !!bcrypt.compareSync(passwordInput, password);
}
