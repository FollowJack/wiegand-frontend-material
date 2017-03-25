/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VehicleService {

  private ANY_DEFAULT = "Beliebig";
  private dropdown: any = {
    brands: [],
    models: [],
    categories: [],
    minPrices: [this.ANY_DEFAULT, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000,
      8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000,
      17500, 20000, 22500, 25000, 27500, 30000,
      35000, 40000, 45000, 50000, 55000, 60000],
    maxPrices: [this.ANY_DEFAULT, 501, 1001, 2001, 3001, 4001, 5001, 6001, 7001,
      8001, 9001, 10001, 11001, 12001, 13001, 14001, 15001,
      17501, 20001, 22501, 25001, 27501, 30001,
      35001, 40001, 45001, 50001, 55001, 60001],
  };

  private vehicles: any;
  private BACKEND_URL = "http://automobile-wiegand.de/api/api/vehicle";

  constructor(private _logger: Logger,
              private http: Http) {
    this._logger.debug('VehicleService - constructor - initialized');
  }

  getDropdown() {
    this._logger.debug('VehicleService - getDropdown');
    return this.dropdown;
  }

  loadDropdowns() {
    this._logger.debug('VehicleService - loadDropdowns');

    var categoriesMap = this.getFilteredDropdown();

    this.dropdown.categories = categoriesMap;
    this.dropdown.brands = categoriesMap[this.ANY_DEFAULT];
    this._logger.debug('VehicleService - loadDropdowns - categories: ' + this.dropdown.categories);

  }

  private getFilteredDropdown() {

    // default category "Beliebig"
    let categoriesMap = {};

    // default category
    categoriesMap[this.ANY_DEFAULT] = {
      value: "",
      amount: this.vehicles.length
    };

    // default category + default brand
    categoriesMap[this.ANY_DEFAULT][this.ANY_DEFAULT] = {
      value: "",
      amount: categoriesMap[this.ANY_DEFAULT].amount
    };

    // default category + default brand + default model
    categoriesMap[this.ANY_DEFAULT][this.ANY_DEFAULT][this.ANY_DEFAULT] = {
      value: "",
      amount: categoriesMap[this.ANY_DEFAULT][this.ANY_DEFAULT].amount
    };

    for (var i = 0; i < this.vehicles.length; i++) {
      let vehicle = this.vehicles[i];
      // get category
      let category = vehicle.category;
      let brand = vehicle.brandDescription;
      let model = vehicle.model;

      // map brand when category default and brand selected
      if (categoriesMap[this.ANY_DEFAULT][brand]) {
        // increase because brand is available
        categoriesMap[this.ANY_DEFAULT][brand].amount = categoriesMap[this.ANY_DEFAULT][brand].amount + 1;
      } else {
        // set new
        categoriesMap[this.ANY_DEFAULT][brand] = {
          value: brand,
          amount: 1
        };
      }

      // map model when category default and brand selected and model selected
      if (categoriesMap[this.ANY_DEFAULT][brand][model]) {
        // increase because model is available
        categoriesMap[this.ANY_DEFAULT][brand][model].amount = categoriesMap[this.ANY_DEFAULT][brand][model].amount + 1;
      } else {
        // set new
        categoriesMap[this.ANY_DEFAULT][brand][model] = {
          value: model,
          amount: 1
        };
      }

      // check if category is set
      if (categoriesMap[category]) {
        // increase because category is available
        categoriesMap[category].amount = categoriesMap[category].amount + 1;
      } else {
        // create new
        categoriesMap[category] = {
          value: category,
          amount: 1
        };
      }

      // map brand when category is set and brand is set
      if (categoriesMap[category][brand]) {
        // increase because brand is available
        categoriesMap[category][brand].amount = categoriesMap[category][brand].amount + 1;
      } else {
        // set new
        categoriesMap[category][brand] = {
          value: brand,
          amount: 1
        };
      }

      // map model when category,brand and model is set
      if (categoriesMap[category][brand][model]) {
        // increase because model is available
        categoriesMap[category][brand][model].amount = categoriesMap[category][brand][model].amount + 1;
      } else {
        // set new
        categoriesMap[category][brand][model] = {
          value: model,
          amount: 1
        };
      }

    }
    return categoriesMap;
  }


  getVehicles() {
    this._logger.debug('VehicleService - getVehicles');

    let url = this.BACKEND_URL;

    if (this.vehicles) {
      this._logger.debug('VehicleService - getVehicles - used cached vehicles: ');
      return Observable.of(this.vehicles);
    } else {
      return this.http.get(url)
        .map((response: any) => {
          this._logger.debug('VehicleService - getVehicles - map response: ' + response);
          this.vehicles = response.json();
          this.loadDropdowns();
          return this.vehicles;
        });
    }
  }

  getVehicle(selectedVehicleId: number) {
    let url = this.BACKEND_URL + '/' + selectedVehicleId;
    return this.http.get(url).map((response: any) => {
      this._logger.debug('VehicleService - getSelectedVehicleById - map response: ' + response);
      return response.json();
    });
  }

}
