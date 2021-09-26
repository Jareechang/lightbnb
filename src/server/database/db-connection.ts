const { Pool } = require('pg');

class Database {
  private pool : any;
  constructor() {
    this.pool = null;
  }
  public configure() {
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME
    });
  }
  public query(sql: string, params: string[]) {
    return this.pool.query(sql, params);
  }
}

export default new Database();
