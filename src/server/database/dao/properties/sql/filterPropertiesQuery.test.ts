import { filterPropertiesQuery } from './filterPropertiesQuery';

describe('filterPropertyQuery', () => {
  const baseQuery : string = 'select \"properties\".*, avg(\"property_reviews\".\"rating\") as \"average_rating\"'
    + ' from \"properties\" inner join \"property_reviews\"'
    + ' on \"properties\".\"id\" = \"property_reviews\".\"property_id\"';

  const closingQuery : string= ' group by \"properties\".\"id\" limit 10';
  it('should be defined', () => {
    expect(filterPropertiesQuery).toBeTruthy();
  });
  it('should return query with correct select and join table', () => {
    expect(filterPropertiesQuery()).toBe(baseQuery + closingQuery);
  });
  describe('where - ‘city‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"city\" ilike 'Vancouver'`;
      expect(filterPropertiesQuery({
        city: 'Vancouver'
      })).toBe(baseQuery + whereClauseQuery + closingQuery);
    });
  });
  describe('where - ‘owner_id‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"owner_id\" = 5`;
      expect(filterPropertiesQuery({
        owner_id: 5
      })).toBe(baseQuery + whereClauseQuery + closingQuery);
    });
  });
  describe('where - ‘owner_id‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"owner_id\" = 5`;
      expect(filterPropertiesQuery({
        owner_id: 5
      })).toBe(baseQuery + whereClauseQuery + closingQuery);
    });
  });
  describe('where - cost, ‘minimum_price_per_night‘ and ‘minimum_price_per_night‘', () => {
    describe('only minimum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" > 100`;
        expect(filterPropertiesQuery({
          minimum_price_per_night: 100
        })).toBe(baseQuery + whereClauseQuery + closingQuery);
      });
    });
    describe('only maximum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" < 500`;
        expect(filterPropertiesQuery({
          maximum_price_per_night: 500
        })).toBe(baseQuery + whereClauseQuery + closingQuery);
      });
    });
  });
  describe('where - ’minimum_rating’', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"property_reviews\".\"rating\" > 4`;
      expect(filterPropertiesQuery({
        minimum_rating: 4
      })).toBe(baseQuery + whereClauseQuery + closingQuery);
    });
  });
  describe('where - combinations', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" > 100`
      + ` and \"properties\".\"cost_per_night\" < 500`;
      expect(filterPropertiesQuery({
        minimum_price_per_night: 100,
        maximum_price_per_night: 500
      })).toBe(baseQuery + whereClauseQuery + closingQuery);
    });
  });
});
