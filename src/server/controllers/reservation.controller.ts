import * as Express from 'express';

import {
  Reservation,
  ReservationService,
  IServices
} from '@app/types';

/*
 *
 *
 * **/
export const withReservationService = (
  func: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => any,
  services: IServices
) => {
  return func.bind({ reservationService: services.reservation });
}

export class ReservationController {
  private reservationService: ReservationService;

  public async getUserReservations(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    let reservations : Reservation[] = [];
    const userId : string = req?.session?.userId ?? '';
    if (!userId) return reservations;
    reservations = await this.reservationService.getReservationsByUserId(
      userId
    );
    return res.status(200).json(reservations);
  }
}
