import { Maybe, User, Reservation } from '.';

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

export interface IServices {
  user: UserService;
  reservation: ReservationService;
}
