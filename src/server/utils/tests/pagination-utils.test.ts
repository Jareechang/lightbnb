import {
  getPage,
  defaultPage,
  defaultEntries,
  getEntries,
  getSqlOptions,
  calculateTotalPageSize,
  getPaginationMetadata,
} from '../pagination-utils';

import {
  Pagination
} from '@app/types';

describe('@app/server/utils/pagination-utils', () => {
  describe('calculateTotalPageSize()', () => {
    it('should calculate the total page size', () => {
      expect(calculateTotalPageSize(1000, {
        entries: 10
      })).toEqual(100);
      expect(calculateTotalPageSize(100, {
        entries: 30
      })).toEqual(3);
    });
    it('should use default value if entries is less than defaultEntries', () => {
      expect(calculateTotalPageSize(100, {
        entries: 7
      })).toEqual(10);
    });
    it('should default to zero (0) if no total is provided', () => {
      expect(calculateTotalPageSize(0, {
        entries: 7
      })).toEqual(0);
      expect(calculateTotalPageSize(null, {
        entries: 7
      })).toEqual(0);
    });
  });
  describe('getEntries()', () => {
    it('should get the correct entries', () => {
      expect(getEntries(15, 100)).toEqual(15);
      expect(getEntries(25, 100)).toEqual(25);
    });
    it('should default to defaultEntries if no entries is provided', () => {
      expect(getEntries(null, 100)).toEqual(defaultEntries);
    });
    it('should default to defaultEntries if no total is provided', () => {
      expect(getEntries(15, null)).toEqual(defaultEntries);
    });
    it('should use defaultEntries if entries is less than the default value', () => {
      expect(getEntries(9, 100)).toEqual(defaultEntries);
      expect(getEntries(7, 100)).toEqual(defaultEntries);
      expect(getEntries(9.5, 100)).toEqual(defaultEntries);
    });
  });
  describe('getPage()', () => {
    it('should get the correct page', () => {
      const totalPageSize : number = 6;
      expect(getPage(5, totalPageSize)).toEqual(5);
      expect(getPage(3, totalPageSize)).toEqual(3);
      expect(getPage(6, totalPageSize)).toEqual(6);
    });
    it('should default to the totalPageSize if page goes beyond it', () => {
      const totalPageSize : number = 6;
      expect(getPage(7, totalPageSize)).toEqual(totalPageSize);
      expect(getPage(10, totalPageSize)).toEqual(totalPageSize);
    });
    it('should use defaultPage if totalPageSize has invalid data', () => {
      expect(getPage(5, null)).toEqual(defaultPage);
      expect(getPage(3, 0)).toEqual(defaultPage);
    });
  });
  describe('getPaginationMetadata()', () => {
    it('should return the correct pagination meta data', () => {
      expect(getPaginationMetadata(1000, {
        page: 1,
        entries: 10
      })).toEqual({
        total: 1000,
        page: 1,
        entries: 10,
        totalPageSize: 100
      });
      expect(getPaginationMetadata(1000, {
        page: 5,
        entries: 25
      })).toEqual({
        total: 1000,
        page: 5,
        entries: 25,
        totalPageSize: 40
      });
    });
    it('should default totalPageSize to zero (0) if no total is provided', () => {
      const paginationMetadata : Pagination = getPaginationMetadata(null, {
        page: 5,
        entries: 25
      });
      expect(paginationMetadata.totalPageSize).toEqual(0);
      expect(paginationMetadata.total).toEqual(0);
    });
    it('should use default entries if no total is provided', () => {
      const paginationMetadata : Pagination = getPaginationMetadata(null, {
        page: 5,
        entries: 25
      });
      expect(paginationMetadata.entries).toEqual(10);
    });
    it('should use default page if no total is provided', () => {
      const paginationMetadata : Pagination = getPaginationMetadata(null, {
        page: 5,
        entries: 25
      });
      expect(paginationMetadata.page).toEqual(1);
    });
    it('should default entries to 10 if no total is provided', () => {
      expect(getPaginationMetadata(null, {
        page: 5,
        entries: 25
      }).entries).toEqual(10);
    });
    it('should return totalPageSize if page goes over the limit', () => {
      expect(getPaginationMetadata(1000, {
        page: 41,
        entries: 25
      }).page).toEqual(40);
    });
  });
  describe('getSqlOptions()', () => {
    it('should return the correct sql options', () => {
      expect(getSqlOptions(1000, {
        page: 5,
        entries: 25
      })).toEqual({
        limit: 25,
        offset: 4 * 25,
      });
      expect(getSqlOptions(500, {
        page: 5,
        entries: 15
      })).toEqual({
        limit: 15,
        offset: 4 * 15,
      });
    });
    it('should default sql options if total data type is invalid', () => {
      expect(getSqlOptions(null, {
        page: 5,
        entries: 25
      })).toEqual({
        limit: 10,
        offset: 0,
      });
    });
    describe('exceeds total limit', () => {
      it('should default sql options if the provided page exceeds total', () => {
        expect(getSqlOptions(1000, {
          page: 1001,
          entries: 1
        })).toEqual({
          limit: 10,
          offset: 990,
        });
      });
      it('should default sql options if the provided page exceeds total but entries is valid', () => {
        expect(getSqlOptions(1000, {
          page: 1001,
          entries: 50
        })).toEqual({
          limit: 50,
          offset: 950,
        });
      });
      it('should default sql options if the provided entries exceeds total', () => {
        expect(getSqlOptions(1000, {
          page: 1,
          entries: 1001
        })).toEqual({
          limit: 10,
          offset: 0,
        });
      });
    });
  });
});
