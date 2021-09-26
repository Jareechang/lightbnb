import { Maybe, User } from '@app/types';

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
