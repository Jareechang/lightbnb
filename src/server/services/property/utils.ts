import get from 'lodash.get';
import {
  Property,
  Pagination,
  FilterPropertiesOptions,
} from '@app/types';

import { toNumber } from '@app/server/utils';

export const getPropertyPagination = (
  properties: Property[],
  options: FilterPropertiesOptions
) : Pagination => {
  const property = properties[0];
  return {
    total: toNumber(property?.total ?? '', 0),
    limit: get(options, 'limit', 10),
    offset: get(options, 'offset', 0),
  };
}
