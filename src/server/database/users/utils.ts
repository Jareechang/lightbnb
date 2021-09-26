import { Maybe, User } from './types';

export const removeUserPasswordField = (
  user: Maybe<Partial<User>>
) : Maybe<Partial<User>> => {
  if (!user) return null;
  return Object.keys(user)
    .reduce((acc, key) => {
      if (key !== 'password') {
        acc[key] = user[key];
      }
      return acc;
    }, ({} as User));
}
