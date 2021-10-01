import {
  getSqlOptions,
  calculateTotalPageSize,
  getPaginationMetadata,
} from '../pagination-utils';

describe('@app/server/utils/pagination-utils', () => {
  describe('calculateTotalPageSize()', () => {
    it('should calculate the total page size', () => {
      expect(calculateTotalPageSize(1000, {
        entries: 10
      })).toEqual(100);
      expect(calculateTotalPageSize(100, {
        entries: 30
      })).toEqual(3);
      expect(calculateTotalPageSize(100, {
        entries: 7
      })).toEqual(14);
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
      expect(getPaginationMetadata(null, {
        page: 5,
        entries: 25
      })).toEqual({
        total: 0,
        page: 5,
        entries: 25,
        totalPageSize: 0
      });
    });
  });
  describe('getSqlOptions()', () => {
    it('should return the correct sql options', () => {
      expect(getSqlOptions(1000, {
        page: 5,
        entries: 25
      })).toEqual({
        limit: 25,
        offset: 5 * 25,
      });
      expect(getSqlOptions(500, {
        page: 5,
        entries: 15
      })).toEqual({
        limit: 15,
        offset: 5 * 15,
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
    it('should default sql options if the provided page exceeds max', () => {
      expect(getSqlOptions(1000, {
        page: 1001,
        entries: 1
      })).toEqual({
        limit: 10,
        offset: 0,
      });
    });
    it('should default sql options if the provided page exceeds max', () => {
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
