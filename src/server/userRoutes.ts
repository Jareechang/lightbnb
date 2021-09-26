import * as Express from 'express';
import bcrypt from 'bcrypt';
import { IServices, User, Maybe } from '@app/types';
import {
  UserController,
  withUserServices
} from '@app/server/controllers';

export default function(
  router: Express.Router,
  // TODO fix type
  database: any,
  services: IServices
) {
  const userController = new UserController();

  // Create a new user
  router.post('/', (
    req: Express.Request,
    res: Express.Response
  ) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then((user: Maybe<User>) => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      if (req.session) {
        req.session.userId = user.id;
      }
      res.send("🤗");
    })
    .catch((e: Error) => res.send(e));
  });

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
