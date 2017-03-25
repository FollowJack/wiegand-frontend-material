import {Pipe} from '@angular/core';
import {Logger} from "angular2-logger/core";

@Pipe({
  name: 'FilterVehiclePipe'
})

export class FilterVehiclePipe {

  constructor(private _logger: Logger) {
    this._logger.debug('FilterVehiclePipe - constructor - initialized');
  }

  transform(vehicles: any, category: any, brand: any, model: any, minPrice: any, maxPrice: any): any {
    this._logger.debug('FilterVehiclePipe - transform - vehicles: ' + vehicles);
    this._logger.debug('FilterVehiclePipe - transform - category: ' + category);
    this._logger.debug('FilterVehiclePipe - transform - brand: ' + brand);
    this._logger.debug('FilterVehiclePipe - transform - model: ' + model);
    this._logger.debug('FilterVehiclePipe - transform - minPrice: ' + minPrice);
    this._logger.debug('FilterVehiclePipe - transform - maxPrice: ' + maxPrice);


    if (!vehicles)
      return vehicles;

    return vehicles.filter((vehicle: any) => {
      if (category && vehicle.category !== category)
        return false;

      if (brand && vehicle.brandDescription.indexOf(brand) === -1)
        return false;

      if (model && vehicle.model !== model)
        return false;

      // minPrice bigger than maxPrice --> swap
      if(Number(minPrice) > Number(maxPrice)){
        var temp = minPrice;
        minPrice = maxPrice;
        maxPrice = temp;
      }

      if (minPrice && Number(vehicle.consumerPriceAmount) < Number(minPrice))
        return false;

      if (maxPrice && Number(vehicle.consumerPriceAmount) > Number(maxPrice))
        return false;

      return true;

    })
  }
}

