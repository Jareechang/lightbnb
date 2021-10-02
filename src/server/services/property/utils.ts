import {
  Maybe,
  Pagination,
} from '@app/types';

import {
  toNumber,
  getPaginationMetadata,
} from '@app/server/utils';

export const getPropertyPagination = (
  total: Maybe<string | number>,
  options: Partial<Pagination>
) : Pagination => {
  const _total : Maybe<number> = toNumber(total ?? '', 0);
  return getPaginationMetadata(_total, options);
}

export const getMinRating = (
  rating: Maybe<string | number>,
) : number => {
  if (!rating) return 1;
  return Math.round(toNumber(rating, 1));
}
