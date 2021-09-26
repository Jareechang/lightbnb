import * as Express from 'express';
import { IServices } from '@app/types';
import {
  UserController,
  withUserServices
} from '@app/server/controllers';

export default function(
  router: Express.Router,
  services: IServices
) {
  const userController = new UserController();

  // Create a new user
  router.post('/',
    withUserServices(userController.signUp, services)
  );

  router.post('/login',
    withUserServices(userController.login, services)
  );

  router.post('/logout',
    withUserServices(userController.login, services)
  );

  router.get("/me",
    withUserServices(userController.currentUser, services)
  );

  return router;
}
