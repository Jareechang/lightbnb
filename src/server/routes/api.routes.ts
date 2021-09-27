import * as Express from 'express';

import { IServices } from '@app/types';

import {
  ReservationController,
  withReservationService
} from '@app/server/controllers';

export default function(
  router: Express.Router,
  database: any,
  services: IServices
) {
  const reservationController = new ReservationController();

  router.get('/properties', (req: Express.Request, res: Express.Response) => {
    database.getAllProperties(req.query, 20)
    .then((properties: unknown) => res.send({properties}))
    .catch((e: Error) => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/reservations',
    withReservationService(reservationController.getUserReservations, services)
  );

  router.post('/properties', (req: Express.Request, res: Express.Response) => {
    const userId : string = req?.session?.userId ?? '';
    database.addProperty({...req.body, owner_id: userId})
      .then((property: unknown) => {
        res.send(property);
      })
      .catch((e: Error) => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}
