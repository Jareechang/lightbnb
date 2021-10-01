import get from 'lodash.get';

import {
  Maybe,
  Pagination,
  SqlOptions,
} from '@app/types';

import { toNumber } from './number-utils';

export const getTotal = (
  total: Maybe<string | number>
) : number => {
  if (!total) return 0;
  return toNumber(total, 0);
}

/*
 *  Calculate the remainig entries available
 *
 *  **defaults:** page: 1, entries: 10
 *
 * **/
export const calculateTotalPageSize = (
  // The total number of entries available
  total: Maybe<string | number>,
  // pagination options in the request
  options: Partial<Pagination>
) : number => {
  const entries : number = get(options, 'entries', 10) ?? 10;
  const _total : number = getTotal(total);
  // If not total is available we can’t calculate total page size
  if (!_total) return _total;
  const totalPageSize = Math.floor(_total / (entries));
  return totalPageSize;
}

/*
 * get the page number within the limits of the max number
 *
 * **/
export const getPage = (
  page: number,
  totalPageSize: number
): number => {
  if (totalPageSize === 0) return page;
  return Math.min(page, totalPageSize);
}

export const getSqlOptions = (
  total: Maybe<string | number>,
  options: Partial<Pagination>
) : SqlOptions => {
  const _total : number = getTotal(total);
  const page : number = toNumber(get(options, 'page', 1)) ?? 1;
  const entries : number = toNumber(get(options, 'entries', 10)) ?? 10;
  const sqlOptions : SqlOptions = {
    limit: 10,
    offset: 0
  };
  if (!_total) {
    return sqlOptions;
  }
  // Ensure we don’t exceed total
  if ((page * entries) < _total) {
    sqlOptions.offset = page * entries;
    sqlOptions.limit = entries;
  }
  return sqlOptions;
}


/*
 *
 * Get the pagination meta data
 *
 * **/
export const getPaginationMetadata = (
  // The total number of entries available
  total: Maybe<number | number>,
  // pagination options in the request
  options: Partial<Pagination>
): Pagination => {
  const page : number = get(options, 'page', 1) ?? 1;
  const entries : number = toNumber(get(options, 'entries', 10), 10);
  const totalPageSize : number = calculateTotalPageSize(
    total,
    options
  );
  return {
    total: total ?? 0,
    page: getPage(page, totalPageSize),
    entries,
    totalPageSize,
  }
}
