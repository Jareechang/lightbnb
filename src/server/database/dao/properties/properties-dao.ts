import {
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
   * search properties
   *
   * **/
  public async searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<Property[]> {
    let properties : Property[] = [];
    try {
      const { rows } = await this.database.query(
        sql.searchPropertiesQuery(options)
      );
      properties = rows;
    } catch (error) {
      console.error('PropertyDataAccess.getProperties failed : ', error);
    }
    return properties;
  }
}

export default PropertyDataAccess;
