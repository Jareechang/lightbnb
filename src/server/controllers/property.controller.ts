import * as Express from 'express';

import {
  PropertyResponse,
  PropertyService,
  FilterPropertiesOptions,
  IServices
} from '@app/types';

/*
 *
 *
 * **/
export const withPropertyService = (
  func: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => any,
  services: IServices
) => {
  return func.bind({ propertyService: services.property });
}

export class PropertyController {
  private propertyService: PropertyService;

  public async searchProperties(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    let properties : PropertyResponse = {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        entries: 10,
        totalPageSize: 0
      }
    };
    const options : FilterPropertiesOptions = req?.query ?? {};
    properties = await this.propertyService.searchProperties(
      options
    );
    return res.status(200).json(properties);
  }

  public async addProperty(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    const property : Property = (req.body as Property);
    const result = await this.propertyService.addProperty(property);
    res.status(200).json(result);
  }
}
