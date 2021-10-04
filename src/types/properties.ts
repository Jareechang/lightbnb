import { Maybe, Pagination } from '.';

export interface BaseFilterPropertiesOptions {
  city?: Maybe<string>;
  owner_id?: Maybe<number>;
  minimum_price_per_night?: Maybe<number>;
  maximum_price_per_night?: Maybe<number>;
  minimum_rating?: Maybe<number>;
}

// User / Client facing options
export type FilterPropertiesOptions = BaseFilterPropertiesOptions & {
  page?: Maybe<number>;
  entries?: Maybe<number>
}

export type FilterPropertiesSqlOptions = BaseFilterPropertiesOptions & {
  limit?: Maybe<number>;
  offset?: Maybe<number>;
}

export interface PropertyReview {
  id: number;
  property_id: number;
  guest_id: number;
  rating: number;
  message: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  thumbnail_photo_url: string;
  cover_photo_url: string;
  cost_per_night: number;
  parking_spaces: number;
  number_of_bathrooms: number;
  number_of_bedrooms: number;
  country: string;
  street: string;
  city: string;
  province: string;
  post_code: string;
  active: boolean;

  // sql alias of average rating
  average_rating?: number
  total: string;
}

export interface PropertyResponse {
  data: Property[];
  pagination: Pagination;
}
