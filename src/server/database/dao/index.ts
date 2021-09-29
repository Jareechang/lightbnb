import {
  IDatabase,
  IDataAccessInstances,
} from '@app/types';
import { UserDataAccess } from './users';
import { ReservationDataAccess } from './reservations';
import { PropertyDataAccess } from './properties';

export const createDataAccessInstances = (
  database: IDatabase
) : IDataAccessInstances => {
  return {
    user: new UserDataAccess(database),
    reservation: new ReservationDataAccess(database),
    property: new PropertyDataAccess(database),
  };
}
