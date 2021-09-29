import {
  IServices,
  IDataAccessInstances,
} from '@app/types';
import { UserService } from './user';
import { ReservationService } from './reservation';
import { PropertyService } from './property';

export const createServices = (
  daos: IDataAccessInstances
) : IServices => {
  return {
    user: new UserService(daos.user),
    reservation: new ReservationService(daos.reservation),
    property: new PropertyService(daos.property),
  };
}
