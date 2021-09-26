import * as Express from 'express';
import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  Config,
  IServices,
  IDatabase,
  IDataAccessInstances
} from '@app/types';

import { Database } from '@app/server/database';
import { createServices } from '@app/server/services';
import { createDataAccessInstances } from '@app/server/database/dao';
import { userRoutes } from '@app/server/routes';

import database from './mockDatabase';
import apiRoutes from './apiRoutes';

// Configure environment
const { parsed: config } = dotenv.config();

// Configure db, services etc
const databaseInstance : IDatabase = new Database((config as Config));
const dataAccessInstances: IDataAccessInstances = createDataAccessInstances(databaseInstance);
const services : IServices = createServices(dataAccessInstances);

const app : Express.Application = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /api/endpoints
const apiRouter : Express.Router = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

// /user/endpoints
const userRouter : Express.Router = express.Router();
userRoutes(userRouter, services);
app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, './public')));

app.get("/test", (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
) => {
  res.send("🤗");
});

const port : string | number = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} 😎`));
