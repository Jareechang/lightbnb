import { Maybe } from '.';

export interface FilterPropertiesOptions {
  city?: Maybe<string>;
  owner_id?: Maybe<number>;
  minimum_price_per_night?: Maybe<number>;
  maximum_price_per_night?: Maybe<number>;
  minimum_rating?: Maybe<number>;
}
