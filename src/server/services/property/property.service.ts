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

  public async searchProperties(
    options: FilterPropertiesOptions
  ) : Promise<PropertyResponse> {
    const total : Maybe<string | number> = await this.getFilteredTotal(options);
    const sqlOptions: FilterPropertiesSqlOptions = {
      ...options,
      // Ensure we are within limits
      ...getSqlOptions(total, {
        page: options?.page ?? 1,
        entries: options?.entries ?? 10,
      })
    };
    const properties : Property[] = await this.propertyDao.searchProperties(
      sqlOptions,
    );
    const paginationOptions: Partial<Pagination> = {
      page: options?.page ?? 1,
      entries: options?.entries ?? 10,
    };
    return {
      data: properties,
      pagination: getPropertyPagination(
        total,
        paginationOptions,
      )
    };
  }

  public async getFilteredTotal(
    options: FilterPropertiesOptions
  ) : Promise<Maybe<number | string>> {
    const maxRecords : Maybe<string | number> = await this.getMax();
    const sqlOptions: FilterPropertiesSqlOptions = {
      ...options,
      // Ensure we are within limits
      ...getSqlOptions(maxRecords, {
        page: options?.page ?? 1,
        entries: options?.entries ?? 10,
      })
    };
    const total : Maybe<string | number> = await this.propertyDao.getTotal(
      sqlOptions
    );
    return total;
  }

  private async getMax() : Promise<Maybe<string | number>>  {
    if (this.total) return this.total;
    const total : Maybe<string | number> = await this.propertyDao.getTotal({});
    this.total = total;
    return total;
  }
}

export default PropertyService;
