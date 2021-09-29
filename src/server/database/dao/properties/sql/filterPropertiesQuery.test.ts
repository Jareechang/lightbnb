import { filterPropertiesQuery } from './filterPropertiesQuery';

describe('filterPropertyQuery', () => {
  const averageAggreateSelect = 'ROUND(AVG(property_reviews.rating), 1) AS average_rating';
  const baseQuery : string = `select \"properties\".*, ${averageAggreateSelect}`
    + ' from \"properties\" inner join \"property_reviews\"'
    + ' on \"properties\".\"id\" = \"property_reviews\".\"property_id\"';

  const closingQuery = (limit = 10, offset = 0) => {
    const groupBy = ` group by \"properties\".\"id\", \"property_reviews\".\"rating\"`;
    const orderBy = ` order by \"property_reviews\".\"rating\" DESC`;
    let closing = groupBy + orderBy + ` limit ${limit}`;
    if (offset > 0) {
      closing += ` offset ${offset}`;
    }
    return closing;
  };
  it('should be defined', () => {
    expect(filterPropertiesQuery).toBeTruthy();
  });
  it('should return query with correct select and join table', () => {
    expect(filterPropertiesQuery()).toBe(baseQuery + closingQuery());
  });
  describe('where - ‘city‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"city\" ilike 'Vancouver'`;
      expect(filterPropertiesQuery({
        city: 'Vancouver'
      })).toBe(baseQuery + whereClauseQuery + closingQuery());
    });
  });
  describe('where - ‘owner_id‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"owner_id\" = 5`;
      expect(filterPropertiesQuery({
        owner_id: 5
      })).toBe(baseQuery + whereClauseQuery + closingQuery());
    });
  });
  describe('where - ‘owner_id‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"owner_id\" = 5`;
      expect(filterPropertiesQuery({
        owner_id: 5
      })).toBe(baseQuery + whereClauseQuery + closingQuery());
    });
  });
  describe('where - cost, ‘minimum_price_per_night‘ and ‘minimum_price_per_night‘', () => {
    describe('only minimum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" > 100`;
        expect(filterPropertiesQuery({
          minimum_price_per_night: 100
        })).toBe(baseQuery + whereClauseQuery + closingQuery());
      });
    });
    describe('only maximum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" < 500`;
        expect(filterPropertiesQuery({
          maximum_price_per_night: 500
        })).toBe(baseQuery + whereClauseQuery + closingQuery());
      });
    });
  });
  describe('where - ’minimum_rating’', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"property_reviews\".\"rating\" >= 4`;
      expect(filterPropertiesQuery({
        minimum_rating: 4
      })).toBe(baseQuery + whereClauseQuery + closingQuery());
    });
  });
  describe('where - combinations', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = ` where \"properties\".\"cost_per_night\" > 100`
      + ` and \"properties\".\"cost_per_night\" < 500`;
      expect(filterPropertiesQuery({
        minimum_price_per_night: 100,
        maximum_price_per_night: 500
      })).toBe(baseQuery + whereClauseQuery + closingQuery());
    });
  });
  describe('limit', () => {
    it('should return query with correct limit clause', () => {
      expect(filterPropertiesQuery({
        limit: 20,
      })).toBe(baseQuery + closingQuery(20));
    });
  });
  describe('offset', () => {
    it('should return query with correct limit clause', () => {
      expect(filterPropertiesQuery({
        offset: 30,
      })).toBe(baseQuery + closingQuery(10, 30));
    });
  });
});
