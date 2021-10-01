import get from 'lodash.get';

import {
  Maybe,
  Pagination,
  SqlOptions,
} from '@app/types';

import { toNumber } from './number-utils';

export const defaultEntries : number = 10;
export const defaultPage : number = 1;

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
  const entries : number = getEntries(options?.entries ?? null, total);
  const _total : number = getTotal(total);
  // If not total is available we can’t calculate total page size
  if (!_total) return _total;
  const totalPageSize = Math.floor(_total / (entries));
  return totalPageSize;
}

/*
 * get the page number within the limits of the total
 *
 * **/
export const getPage = (
  page: number,
  totalPageSize: Maybe<number>
): number => {
  if (!totalPageSize || totalPageSize === 0) return defaultPage;
  return Math.min(page, totalPageSize);
}

/*
 * get the entries within the limits of the total
 *
 * **/
export const getEntries = (
  entries: Maybe<number>,
  total: Maybe<number | string>
): number => {
  if (!total || total === 0 || !entries) return defaultEntries;
  if (entries < defaultEntries) return defaultEntries;
  return (entries < total) ? entries : defaultEntries;
}

export const getSqlOptions = (
  total: Maybe<string | number>,
  options: Partial<Pagination>
) : SqlOptions => {
  const _total : number = getTotal(total);
  const paginationMetadata : Pagination = getPaginationMetadata(_total, options);
  /*
   * To map from page to offset, we’ll need to start at zero
   * First page requires offset = 0
   * **/
  const page = paginationMetadata.page - 1;
  const entries = paginationMetadata.entries;

  //const page : number = (toNumber(get(options, 'page', defaultPage)) ?? defaultPage) - 1;
  //const entries : number = toNumber(get(options, 'entries', defaultEntries)) ?? defaultEntries;
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
    return sqlOptions;
  }

  return sqlOptions;
}


/*
 *
 * Get the pagination meta data
 *
 * entries - return the entries or the defaultEntries if it exceeds total
 * page - return smaller of the two the page or the totalPageSize
 *
 * **/
export const getPaginationMetadata = (
  // The total number of entries available
  total: Maybe<number | number>,
  // pagination options in the request
  options: Partial<Pagination>
): Pagination => {
  const _total = getTotal(total);
  const page : number = get(options, 'page', 1) ?? 1;
  const entries : number = toNumber(get(options, 'entries', 10), 10);
  const totalPageSize : number = calculateTotalPageSize(
    total,
    options
  );
  return {
    total: _total,
    page: getPage(page, totalPageSize),
    entries: getEntries(entries, _total),
    totalPageSize,
  }
}
