import {
  Reservation,
  IReservationDataAccessInstance
} from '@app/types';

class ReservationService {
  private reservationDao: IReservationDataAccessInstance;

  constructor(reservationDao: IReservationDataAccessInstance) {
    this.reservationDao = reservationDao;
  }

  /*
   *
   * Get Reservations by by user’s id
   *
   * **/
  public async getReservationsByUserId(
    id: string
  ) : Promise<Reservation[]> {
    let reservations : Reservation[] = await this.reservationDao.getReservationsByUserId(
      id
    );
    return reservations;
  }
}

export default ReservationService;
