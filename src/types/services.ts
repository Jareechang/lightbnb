import {
  Maybe,
  User,
  Reservation,
  Property,
  PropertyResponse,
  FilterPropertiesOptions,
} from '.';

export interface UserService {
  signUp(
    name: string,
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  login(
    email: string,
    password: string
  ) : Promise<Maybe<User>>;

  getCurrentUser(
    id: string
  ) : Promise<Maybe<User>>;
}

export interface ReservationService {
  getReservationsByUserId(
    id: string
  ) : Promise<Reservation[]>;
}

export interface PropertyService {
  searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<PropertyResponse>;

  addProperty(
    property: Property
  ) : Promise<Maybe<Property>>;
}

export interface IServices {
  user: UserService;
  reservation: ReservationService;
  property: PropertyService;
}
