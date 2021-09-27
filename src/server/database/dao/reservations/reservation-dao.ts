import {
  Reservation,
  IDatabase,
  IReservationDataAccessInstance,
} from '@app/types';

import * as sql from './sql';

class ReservationDataAccess implements IReservationDataAccessInstance {
  private database : IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  /*
   * Get user’s reservations
   *
   * @param {String} id - user’s id
   *
   * **/
  public async getReservationsByUserId(
    id: string
  ) : Promise<Reservation[]> {
    let reservations : Reservation[] = [];
    try {
      const { rows } = await this.database.query(
        sql.getReservationByUserId,
        [id]
      );
      reservations = rows;
    } catch (error) {
      console.error('ReservationDataAccess.getReservations failed : ', error);
    }
    return reservations;
  }
}

export default ReservationDataAccess;
