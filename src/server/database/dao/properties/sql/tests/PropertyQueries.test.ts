import {
  searchPropertiesQuery,
  totalPropertiesQuery,
} from '../PropertyQueries';

import {
  FilterPropertiesOptions
} from '@app/types';

describe('PropertyQueries', () => {
  describe('searchPropertiesQuery()', () => {
    const average = 'ROUND(AVG(property_reviews.rating), 1) AS average_rating';
    const baseQuery = (totalQuery: string = '') => {
      return `select \"properties\".*, ${average}`
        + ' from \"properties\" inner join \"property_reviews\"'
        + ' on \"properties\".\"id\" = \"property_reviews\".\"property_id\"';
    }

    const groupBy = ` group by \"properties\".\"id\", \"property_reviews\".\"rating\"`;
    const orderBy = ` order by \"average_rating\" DESC`;
    const closingQuery = (limit = 10, offset = 0) => {
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
      expect(searchPropertiesQuery().toString()).toBe(baseQuery() + closingQuery());
    });
    describe('where - ‘city‘', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = `where \"city\" ilike 'Vancouver'`;
        const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
        expect(searchPropertiesQuery({
          city: 'Vancouver'
        }).toString()).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
      });
    });
    describe('where - ‘owner_id‘', () => {
      it('should return query with correct where clause', () => {
        const total : string  = '(select count("properties".*) from "properties" where "owner_id" = 5) as \"total\"';
        const whereClauseQuery : string = ` where \"owner_id\" = 5`;
        expect(searchPropertiesQuery({
          owner_id: 5
        }).toString()).toBe(baseQuery(total) + whereClauseQuery + closingQuery());
      });
    });
    describe('where - cost, ‘minimum_price_per_night‘ and ‘minimum_price_per_night‘', () => {
      describe('only minimum_price_per_night', () => {
        it('should return query with correct where clause', () => {
          const whereClauseQuery : string = `where \"properties\".\"cost_per_night\" > 100`;
          const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
          expect(searchPropertiesQuery({
            minimum_price_per_night: 100
          }).toString()).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
        });
      });
      describe('only maximum_price_per_night', () => {
        it('should return query with correct where clause', () => {
          const whereClauseQuery : string = `where \"properties\".\"cost_per_night\" < 500`;
          const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
          expect(searchPropertiesQuery({
            maximum_price_per_night: 500
          }).toString()).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
        });
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
        }).toString()).toBe(baseQuery(total) + ` ${whereClauseQuery}` + closingQuery());
      });
    });
    describe('having - ’minimum_rating’', () => {
      it('should return query with correct where clause', () => {
        const whereClauseQuery : string = `having ROUND(AVG(property_reviews.rating), 1) >= 4`;
        const total : string  = `(select count("properties".*) from "properties" ${whereClauseQuery}) as \"total\"`;
        const rating : number = 4;
        const havingQuery : string= `having ROUND(AVG(property_reviews.rating), 1) >= ${rating}`;
        const generatedQuery = searchPropertiesQuery({
          minimum_rating: rating,
        }, { skipLimit: true }).toString()
        expect(generatedQuery).toBe(baseQuery(total) +  groupBy + ` ${havingQuery}` + orderBy);
      });
    });
    describe('limit', () => {
      it('should return query with correct limit clause', () => {
        expect(searchPropertiesQuery({
          limit: 20,
        }).toString()).toBe(baseQuery() + closingQuery(20));
      });
    });
    describe('offset', () => {
      it('should return query with correct limit clause', () => {
        expect(searchPropertiesQuery({
          offset: 30,
        }).toString()).toBe(baseQuery() + closingQuery(10, 30));
      });
    });
  });
  describe('totalPropertiesQuery()', () => {
    describe('where', () => {
      const generateTotalQuery = (subQuery: string): string => {
          return `select count(\"results\".\"id\") from (${subQuery}) as \"results\"`
      };
      it('it should generate the correct total query for min and max price per night filter', () => {
        const options : FilterPropertiesOptions = {
          minimum_price_per_night: 100,
          maximum_price_per_night: 500
        };
        const subQuery : string = searchPropertiesQuery(options, { skipLimit: true }).toString();
        expect(subQuery).toMatch(/where "properties"."cost_per_night" > 100/);
        expect(subQuery).toMatch(/and "properties"."cost_per_night" < 500/);
        expect(totalPropertiesQuery(options).toString()).toBe(
          generateTotalQuery(subQuery)
        );
      });
      it('it should generate the correct total query for minimum rating filter', () => {
        const options : FilterPropertiesOptions = {
          minimum_rating: 3.5,
        };
        const subQuery : string = searchPropertiesQuery(options, { skipLimit: true }).toString();
        expect(subQuery).toMatch(/having ROUND\(AVG\(property_reviews.rating\), 1\) >= 3.5/);
        expect(totalPropertiesQuery(options).toString()).toBe(
          generateTotalQuery(subQuery)
        );
      });
      it('it should generate the correct total query for city filter', () => {
        const options : FilterPropertiesOptions = {
          city: 'Vancouver'
        };
        const subQuery : string = searchPropertiesQuery(options, { skipLimit: true }).toString();
        expect(subQuery).toMatch(/where "city" ilike 'Vancouver'/);
        expect(totalPropertiesQuery(options).toString()).toBe(
          generateTotalQuery(subQuery)
        );
      });
    })
  });
});
