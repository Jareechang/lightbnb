import {
  Pagination,
  Property,
} from '@app/types';

import { getPropertyPagination } from '../utils';

describe('properties.utils', () => {
  describe('getPropertyPagination()', () => {
    it('should return the correct total', () => {
      const mockProperties = [ {total: '100'} ];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 4,
      };
      const pagination : Pagination = getPropertyPagination(
        (mockProperties as Property[]),
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
      const mockProperties = [ {total: '100'} ];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        (mockProperties as Property[]),
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
      const mockProperties : Property[] = [];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        mockProperties,
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
      const mockProperties : Property[] = [];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        mockProperties,
        mockFilterOptions
      );
      expect(pagination.page).toEqual(1);
    });
    it('should return default entries if there are no properties', () => {
      const mockProperties : Property[] = [];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
        page: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        mockProperties,
        mockFilterOptions
      );
      expect(pagination.entries).toEqual(10);
    });
    it('should default to page as 1', () => {
      const mockProperties : Property[] = [];
      const mockFilterOptions : Partial<Pagination> = {
        entries: 25,
      };
      const pagination : Pagination = getPropertyPagination(
        mockProperties,
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
      const mockProperties : Property[] = [];
      const mockFilterOptions : Partial<Pagination> = {
        page: 1,
        entries: 10,
      };
      const pagination : Pagination = getPropertyPagination(
        mockProperties,
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
});
