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

  public async addProperty(
    property: Property
  ) : Promise<Maybe<Property>> {
    let result: Maybe<Property> = null;
    try {
      const { rows } = await this.database.query(
        sql.InsertProperties,
        [
          property.owner_id,
          property.title,
          property.description,
          property.thumbnail_photo_url,
          property.cover_photo_url,
          `${property.cost_per_night}`,
          property.street,
          property.city,
          property.province,
          property.post_code,
          property.country,
          `${property.parking_spaces}`,
          `${property.number_of_bathrooms}`,
          `${property.number_of_bedrooms}`,
          `${property.active ?? false}`,
        ]
      );
      result = rows[0];
    } catch (error) {
      console.error('PropertyDataAccess.searchProperties failed : ', error);
    }
    return result;
  }
}

export default PropertyDataAccess;
