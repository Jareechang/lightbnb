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
        limit: 10,
        offset: 0
      }
    };
    const options : FilterPropertiesOptions = req?.body ?? {};
    properties = await this.propertyService.searchProperties(
      options
    );
    return res.status(200).json(properties);
  }
}
