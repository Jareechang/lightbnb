import * as pg from 'pg';
import { Pool } from 'pg';

interface IDatabase {
  configure() : void;

  /*
   * Query for pg
   *
   * **/
  query<T = any>(
    sql: string,
    params: string[]
  ) : Promise<pg.QueryResult<T>>;
}

class Database implements IDatabase {
  private pool : pg.Pool;

  public configure() {
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME
    });
  }

  public query<T = any>(
    sql: string,
    params: string[]
  ) : Promise<pg.QueryResult<T>> {
    return this.pool.query(sql, params);
  }
}

export default new Database();
