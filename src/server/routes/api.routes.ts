import * as Express from 'express';

import { IServices } from '@app/types';

import {
  ReservationController,
  withReservationService,
  PropertyController,
  withPropertyService,
} from '@app/server/controllers';

export default function(
  router: Express.Router,
  services: IServices,
) {
  const reservationController = new ReservationController();
  const propertyController = new PropertyController();

  router.get('/properties',
    withPropertyService(propertyController.searchProperties, services)
  );

  router.post('/properties',
    withPropertyService(propertyController.addProperty, services)
  );

  router.get('/reservations',
    withReservationService(reservationController.getUserReservations, services)
  );

  return router;
}
