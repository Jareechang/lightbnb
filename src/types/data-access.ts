import {
  User,
  Maybe,
  Property,
  Reservation,
  FilterPropertiesOptions,
} from '.';

export interface IUserDataAccessInstance {
  create(
    name: string,
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  getByEmail(
    email: string
  ) : Promise<Maybe<User>>;

  getById(
    id: string
  ) : Promise<Maybe<User>>;
}

export interface IReservationDataAccessInstance {
  getReservationsByUserId(
    id: string
  ) : Promise<Reservation[]>;
}

export interface IPropertyDataAccessInstance {
  searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<Property[]>;
}

export interface IDataAccessInstances {
  user: IUserDataAccessInstance;
  reservation: IReservationDataAccessInstance;
  property: IPropertyDataAccessInstance;
}
