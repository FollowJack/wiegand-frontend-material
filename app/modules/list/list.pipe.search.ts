import {Pipe} from '@angular/core';
import {Logger} from "angular2-logger/core";

@Pipe({
  name: 'SearchVehiclePipe'
})

export class SearchVehiclePipe {

  constructor(private _logger: Logger) {
    this._logger.debug('SearchVehiclePipe - constructor - initialized');
  }

  transform(vehicles: any, freeText: any): any {
    this._logger.debug('SearchVehiclePipe - transform - vehicles: ' + vehicles);

    if (!vehicles || freeText == "")
      return vehicles;

    let freeTextLowerCase = freeText.toLowerCase();

    return vehicles.filter((vehicle: any) => {
        var concatinatedVehicle = vehicle.brandDescription
          + " " + vehicle.modelDescription
          + " " + vehicle.category
          + " " + vehicle.model;

        if (vehicle.engineSpecifics) {
          concatinatedVehicle = concatinatedVehicle
            + " " + vehicle.engineSpecifics.fuelType
            + " " + vehicle.engineSpecifics.gearBox
            + " " + vehicle.engineSpecifics.airConditioning;
        }

        concatinatedVehicle = concatinatedVehicle.toLowerCase();

        if (concatinatedVehicle.match(freeTextLowerCase)) {
          return true
        }

        return false;
      }
    );


    /*if ((vehicle.brandDescription && vehicle.brandDescription.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
     || (vehicle.modelDescription && vehicle.modelDescription.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
     || (vehicle.category && vehicle.category.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
     || (vehicle.model && vehicle.model.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))) {
     return true;
     }
     return false;*/
  }

}

