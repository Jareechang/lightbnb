import {
  Pagination,
} from '@app/types';

import {
  getMinRating,
  getPropertyPagination
} from '../utils';

describe('properties.utils', () => {
  describe('getPropertyPagination()', () => {
    it('should return the correct total', () => {
      const total : number = 100;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 4,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        total: 100,
        entries: 25,
        page: 4,
        totalPageSize: 4,
      });
    });
    it('should return the correct pagination when given string total', () => {
      const total : string = '100';
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 4,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        total: 100,
        entries: 25,
        page: 4,
        totalPageSize: 4,
      });
    });
    it('should only max page size for anything above it', () => {
      const total : number = 100;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        total: 100,
        entries: 25,
        page: 4,
        totalPageSize: 4,
      });
    });
    it('should return zero as ‘total’ if there are no properties', () => {
      const total = null;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        total: 0,
        page: 1,
        entries: 10,
        totalPageSize: 0,
      });
    });
    it('should return default page if there are no properties', () => {
      const total = null;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination.page).toEqual(1);
    });
    it('should return default entries if there are no properties', () => {
      const total = null;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination.entries).toEqual(10);
    });
    it('should default to page as 1', () => {
      const total = null;
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        page: 1,
        total: 0,
        entries: 10,
        totalPageSize: 0,
      });
    });
    it('should default to entries as 10', () => {
      const total = null;
      const mockFilterOptions : Partial<Pagination> = {
        page: 1,
        entries: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        total,
        mockFilterOptions
      );
      expect(pagination).toEqual({
        page: 1,
        total: 0,
        entries: 10,
        totalPageSize: 0,
      });
    });
  });
  describe('getMinRating()', () => {
    it('should convert string rating to a number', () => {
      expect(getMinRating('3')).toEqual(3);
      expect(getMinRating('5')).toEqual(5);
      expect(getMinRating('4')).toEqual(4);
    });
    it('should default to one (1) if invalid rating data is provided', () => {
      expect(getMinRating(null)).toEqual(1);
      expect(getMinRating(undefined)).toEqual(1);
    });
    it('should round the rating to the nearest whole interger', () => {
      expect(getMinRating('3.5')).toEqual(4);
      expect(getMinRating('3.2')).toEqual(3);
      expect(getMinRating('2.1')).toEqual(2);
    });
  });
});
