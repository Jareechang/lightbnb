import * as pg from 'pg';
import { Pool } from 'pg';
import { Config, IDatabase } from '@app/types';

class Database implements IDatabase {
  private pool : pg.Pool;

  constructor(
    config: Config
  ) {
    this.pool = new Pool({
      user: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      database: config.DB_NAME
    });
  }

  public query<T = any>(
    sql: string,
    params: string[]
  ) : Promise<pg.QueryResult<T>> {
    return this.pool.query(sql, params);
  }
}

export default Database;
