import {
  Maybe,
  Property,
  IDatabase,
  IPropertyDataAccessInstance,
  FilterPropertiesOptions
} from '@app/types';

import * as sql from './sql';

class PropertyDataAccess implements IPropertyDataAccessInstance {
  private database : IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }
  /*
   * get total number of properties
   *
   * **/
  public async getTotal(
    options?: FilterPropertiesOptions
  ) : Promise<Maybe<number | string>> {
    let total : Maybe<number> = 0;
    try {
      const { rows } = await this.database.query(
        sql.totalPropertiesQuery(options).toString()
      );
      total = rows[0]?.count || 0;
    } catch (error) {
      console.error('PropertyDataAccess.getTotal failed : ', error);
    }
    return total;
  }

  /*
   * search properties
   *
   * **/
  public async searchProperties(
    options?: FilterPropertiesOptions
  ) : Promise<Property[]> {
    let properties : Property[] = [];
    try {
      const { rows } = await this.database.query(
        sql.searchPropertiesQuery(options).toString()
      );
      properties = rows;
    } catch (error) {
      console.error('PropertyDataAccess.searchProperties failed : ', error);
    }
    return properties;
  }
}

export default PropertyDataAccess;
