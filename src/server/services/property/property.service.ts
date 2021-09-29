import {
  Maybe,
  Property,
  FilterPropertiesOptions,
  IPropertyDataAccessInstance,
} from '@app/types';

class PropertyService {
  private propertyDao: IPropertyDataAccessInstance;

  constructor(propertyDao: IPropertyDataAccessInstance) {
    this.propertyDao = propertyDao;
  }

  public async searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<Property[]> {
    const properties : Property[] = await this.propertyDao.searchProperties(
      options
    );
    return properties;
  }
}

export default PropertyService;
