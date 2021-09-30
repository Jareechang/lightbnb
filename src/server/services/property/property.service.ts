import {
  FilterPropertiesOptions,
  IPropertyDataAccessInstance,
  Property,
  PropertyResponse,
} from '@app/types';

import { getPropertyPagination } from './utils';

class PropertyService {
  private propertyDao: IPropertyDataAccessInstance;

  constructor(propertyDao: IPropertyDataAccessInstance) {
    this.propertyDao = propertyDao;
  }

  public async searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<PropertyResponse> {
    const properties : Property[] = await this.propertyDao.searchProperties(
      options
    );
    return {
      data: properties,
      pagination: getPropertyPagination(
        properties,
        options
      )
    };
  }
}

export default PropertyService;
