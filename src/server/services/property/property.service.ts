import {
  Maybe,
  FilterPropertiesOptions,
  FilterPropertiesSqlOptions,
  IPropertyDataAccessInstance,
  Property,
  PropertyResponse,
  Pagination,
} from '@app/types';

import { getSqlOptions } from '@app/server/utils';

import {
  getPropertyPagination,
} from './utils';


class PropertyService {
  private propertyDao: IPropertyDataAccessInstance;
  // Todo think about app caching
  private total : Maybe<string | number> = null;

  constructor(propertyDao: IPropertyDataAccessInstance) {
    this.propertyDao = propertyDao;
  }

  public async getTotal(
    options: FilterPropertiesOptions
  ) : Promise<Maybe<string | number>> {
    const total : Maybe<string | number> = await this.getTotalEntries();
    const sqlOptions: FilterPropertiesSqlOptions = {
      ...options,
      ...getSqlOptions(total, {
        page: options?.page ?? 1,
        entries: options?.entries ?? 10,
      })
    };
    return await this.propertyDao.getTotal(
      sqlOptions,
    );
  }

  public async searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<PropertyResponse> {
    const total : Maybe<string | number> = await this.getTotalEntries();
    const sqlOptions: FilterPropertiesSqlOptions = {
      ...options,
      ...getSqlOptions(total, {
        page: options?.page ?? 1,
        entries: options?.entries ?? 10,
      })
    };
    const properties : Property[] = await this.propertyDao.searchProperties(
      sqlOptions,
    );
    console.log('sql options: ', sqlOptions);
    const paginationOptions: Partial<Pagination> = {
      page: options?.page ?? 1,
      entries: options?.entries ?? 10,
    };
    return {
      data: properties,
      pagination: getPropertyPagination(
        properties,
        paginationOptions,
      )
    };
  }

  private async getTotalEntries() : Promise<Maybe<number | string>> {
    if (this.total) return this.total;
    const options : Partial<Pagination> = {
      page: 1,
      entries: 10,
    };
    const total : Maybe<string | number> = await this.propertyDao.getTotal(
      options
    );
    return total;
  }
}

export default PropertyService;
