import {
  knex
} from '@app/server/external';

import {
  FilterPropertiesOptions
} from '@app/types';


//interface Properties {}

export const filterPropertiesQuery = (
  options?: FilterPropertiesOptions,
  limit: number = 10,
  offset: number = 0,
): string => {
  try {
    const query = knex()
      .select('properties.*')
      .avg('property_reviews.rating as average_rating')
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
        .where('property_reviews.rating', '>', options?.minimum_rating);
    }

    query
      .groupBy('properties.id')
      .limit(limit)
      .offset(offset)

    return query.toString();
  } catch (error) {
    console.error('filterPropertiesQuery -> failed to generate : ', error);
  }

  return '';
}
