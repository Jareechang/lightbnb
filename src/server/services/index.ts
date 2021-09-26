import {
  IServices,
  IDataAccessInstances,
} from '@app/types';
import { UserService } from './user';

export const createServices = (
  daos: IDataAccessInstances
) : IServices => {
  return {
    user: new UserService(daos.user)
  };
}
