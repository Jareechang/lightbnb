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
