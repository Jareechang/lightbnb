import { Maybe } from '.';
import * as pg from 'pg';

export interface IDatabase {
  /*
   * Query for pg
   *
   * **/
  query<T = any>(
    sql: string,
    params?: string[]
  ) : Promise<pg.QueryResult<T>>;
}

export interface SqlOptions {
  limit: Maybe<number>;
  offset: Maybe<number>;
}

export interface QueryBuilderOptions {
  skipLimit?: boolean;
}
