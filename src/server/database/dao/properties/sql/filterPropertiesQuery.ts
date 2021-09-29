import get from 'lodash.get';
import {
  knex
} from '@app/server/external';

import {
  FilterPropertiesOptions
} from '@app/types';

export const filterPropertiesQuery = (
  options?: FilterPropertiesOptions,
): string => {
  try {
    const total = knex.raw('(SELECT count(properties.*) FROM properties) as total');

    const query = knex.queryBuilder()
      .select('properties.*', total)
      .select(knex.raw('ROUND(AVG(property_reviews.rating), 1) AS average_rating'))
      .from('properties')
      .innerJoin('property_reviews', 'properties.id', 'property_reviews.property_id')

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

    if (options?.minimum_rating) {
      query
        .where('property_reviews.rating', '>=', options?.minimum_rating);
    }

    query
      .groupBy('properties.id', 'property_reviews.rating')
      .orderBy('property_reviews.rating', 'DESC')

    query.limit(get(options, 'limit', 10));

    // Set offset if its anything other than zero
    // TODO check for total or max records
    if (get(options, 'offset', 0) > 0) {
      query.offset(get(options, 'offset'));
    }

    return query.toString();
  } catch (error) {
    console.error('filterPropertiesQuery -> failed to generate : ', error);
  }

  return '';
}
