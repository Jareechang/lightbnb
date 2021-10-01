import { Maybe } from '.';

export interface Pagination {
  total: number;
  totalPageSize: number;
  page: number;
  entries: number;
}

export interface SqlOptions {
  limit: Maybe<number>;
  offset: Maybe<number>;
}
