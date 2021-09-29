import {
  Pagination,
  Property,
  FilterPropertiesOptions,
} from '@app/types';

import { getPropertyPagination } from '../utils';

describe('properties.utils', () => {
  it('should return the correct total', () => {
    const mockProperties = [ {total: '100'} ];
    const mockFilterOptions : FilterPropertiesOptions = {
      limit: 25,
      offset: 10,
    };
    const pagination : Pagination = getPropertyPagination(
      mockProperties,
      mockFilterOptions
    );
    expect(pagination).toEqual({
      total: 100,
      limit: 25,
      offset: 10,
    });
  });
  it('should return zero as ‘total’ if there are no properties', () => {
    const mockProperties : Property[] = [];
    const mockFilterOptions : FilterPropertiesOptions = {
      limit: 25,
      offset: 10,
    };
    const pagination : Pagination = getPropertyPagination(
      mockProperties,
      mockFilterOptions
    );
    expect(pagination).toEqual({
      total: 0,
      limit: 25,
      offset: 10,
    });
  });
  it('should default to offset as 0', () => {
    const mockProperties : Property[] = [];
    const mockFilterOptions : FilterPropertiesOptions = {
      limit: 25,
    };
    const pagination : Pagination = getPropertyPagination(
      mockProperties,
      mockFilterOptions
    );
    expect(pagination).toEqual({
      total: 0,
      limit: 25,
      offset: 0,
    });
  });
  it('should default to limit as 10', () => {
    const mockProperties : Property[] = [];
    const mockFilterOptions : FilterPropertiesOptions = {
      offset: 10,
    };
    const pagination : Pagination = getPropertyPagination(
      mockProperties,
      mockFilterOptions
    );
    expect(pagination).toEqual({
      total: 0,
      limit: 10,
      offset: 10,
    });
  });
});
