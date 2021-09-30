import { searchPropertiesQuery } from '../PropertyQueries';

describe('searchPropertiesQuery', () => {
  const average = 'ROUND(AVG(property_reviews.rating), 1) AS average_rating';
  const baseQuery = (totalQuery: string = '') => {
    const total : string = totalQuery || '(select count(\"properties\".*) from \"properties\") as \"total\"';
    return `select \"properties\".*, ${total}, ${average}`
      + ' from \"properties\" inner join \"property_reviews\"'
      + ' on \"properties\".\"id\" = \"property_reviews\".\"property_id\"';
  }

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
    expect(searchPropertiesQuery).toBeTruthy();
  });
  it('should return query with correct select and join table', () => {
    expect(searchPropertiesQuery()).toBe(baseQuery() + closingQuery());
  });
  describe('where - ‘city‘', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = `where \"city\" ilike 'Vancouver'`;
      const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
      expect(searchPropertiesQuery({
        city: 'Vancouver'
      })).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
    });
  });
  describe('where - ‘owner_id‘', () => {
    it('should return query with correct where clause', () => {
      const total : string  = '(select count("properties".*) from "properties" where "owner_id" = 5) as \"total\"';
      const whereClauseQuery : string = ` where \"owner_id\" = 5`;
      expect(searchPropertiesQuery({
        owner_id: 5
      })).toBe(baseQuery(total) + whereClauseQuery + closingQuery());
    });
  });
  describe('where - cost, ‘minimum_price_per_night‘ and ‘minimum_price_per_night‘', () => {
    describe('only minimum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = `where \"properties\".\"cost_per_night\" > 100`;
        const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
        expect(searchPropertiesQuery({
          minimum_price_per_night: 100
        })).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
      });
    });
    describe('only maximum_price_per_night', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = `where \"properties\".\"cost_per_night\" < 500`;
        const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
        expect(searchPropertiesQuery({
          maximum_price_per_night: 500
        })).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
      });
    });
  });
  describe('where - ’minimum_rating’', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = `where \"property_reviews\".\"rating\" >= 4`;
      const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
      expect(searchPropertiesQuery({
        minimum_rating: 4
      })).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
    });
  });
  describe('where - combinations', () => {
    it('should return query with correct where clause', () => {
      const whereClauseQuery : string = `where \"properties\".\"cost_per_night\" > 100`
      + ` and \"properties\".\"cost_per_night\" < 500`;
      const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
      expect(searchPropertiesQuery({
        minimum_price_per_night: 100,
        maximum_price_per_night: 500
      })).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
    });
  });
  describe('limit', () => {
    it('should return query with correct limit clause', () => {
      expect(searchPropertiesQuery({
        limit: 20,
      })).toBe(baseQuery() + closingQuery(20));
    });
  });
  describe('offset', () => {
    it('should return query with correct limit clause', () => {
      expect(searchPropertiesQuery({
        offset: 30,
      })).toBe(baseQuery() + closingQuery(10, 30));
    });
  });
});
