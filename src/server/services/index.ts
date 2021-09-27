import {
  IServices,
  IDataAccessInstances,
} from '@app/types';
import { UserService } from './user';
import { ReservationService } from './reservation';

export const createServices = (
  daos: IDataAccessInstances
) : IServices => {
  return {
    user: new UserService(daos.user),
    reservation: new ReservationService(daos.reservation),
  };
}
