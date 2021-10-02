import get from 'lodash.get';
import {
  createKnexQueryBuilder,
  knex,
} from '@app/server/external';

import {
  Maybe,
  QueryBuilderOptions,
  FilterPropertiesSqlOptions
} from '@app/types';

import {
  toNumber
} from '@app/server/utils';

export const filterClauses = (
  query: any,
  options?: Maybe<FilterPropertiesSqlOptions>,
) => {
  if (!query) return query;

  if (options?.city) {
    query.where('city', 'ilike', options?.city);
  }

  if (options?.owner_id) {
    query.where('owner_id', '=', options?.owner_id);
  }

  if (options?.minimum_price_per_night) {
    query.where('properties.cost_per_night', '>', options?.minimum_price_per_night);
  }

  if (options?.maximum_price_per_night) {
    if (options?.minimum_price_per_night) {
      query
        .where('properties.cost_per_night', '<', options?.maximum_price_per_night);
    } else {
      query
        .andWhere('properties.cost_per_night', '<', options?.maximum_price_per_night);
    }
  }

  return query;
}

export const totalPropertiesQuery = (
  options?: FilterPropertiesSqlOptions,
) : any => {
  return createKnexQueryBuilder()
    .count('results.id')
    .from(
      searchPropertiesQuery(options, { skipLimit: true })
      .as('results')
    );
}

export const searchPropertiesQuery = (
  options?: FilterPropertiesSqlOptions,
  queryOptions: QueryBuilderOptions = {
    skipLimit: false
  }
): any => {
  const skipLimit : boolean = get(queryOptions, 'skipLimit', false);
  let query = createKnexQueryBuilder()
    .select('properties.*')
    .select(knex.raw('ROUND(AVG(property_reviews.rating), 1) AS average_rating'))
    .from('properties')
    .innerJoin('property_reviews', 'properties.id', 'property_reviews.property_id')

  query = filterClauses(query, options);

  query
    .groupBy('properties.id', 'property_reviews.rating')
    .orderBy('average_rating', 'DESC')

  if (options?.minimum_rating) {
    query
      .having(knex.raw('ROUND(AVG(property_reviews.rating), 1)'), '>=',
        toNumber(options?.minimum_rating, 1)
      );
  }

  if (!skipLimit) {
    query.limit(get(options, 'limit', 10));
  }

  const offset = get(options, 'offset', 0) ?? 0;

  if (options && offset > 0) {
    query.offset(get(options, 'offset'));
  }

  return query;
}
