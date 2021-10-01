import {
  Maybe,
  Property,
  Pagination,
} from '@app/types';

import {
  toNumber,
  getPaginationMetadata,
} from '@app/server/utils';

export const getPropertyPagination = (
  properties: Property[],
  options: Partial<Pagination>
) : Pagination => {
  const property : Property = properties[0];
  const total : Maybe<number> = toNumber(property?.total ?? '', 0);
  return getPaginationMetadata(total, options);
}
