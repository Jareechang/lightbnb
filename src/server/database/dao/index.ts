import {
  IDatabase,
  IDataAccessInstances,
} from '@app/types';
import { UserDataAccess } from './users';

export const createDataAccessInstances = (
  database: IDatabase
) : IDataAccessInstances => {
  return {
    user: new UserDataAccess(database)
  };
}
