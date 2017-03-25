"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by denielhorvatic on 21.12.16.
 */
var core_1 = require("@angular/core");
var core_2 = require("angular2-logger/core");
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var Observable_1 = require('rxjs/Observable');
var VehicleService = (function () {
    function VehicleService(_logger, http) {
        this._logger = _logger;
        this.http = http;
        this.ANY_DEFAULT = "Beliebig";
        this.dropdown = {
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
        this.BACKEND_URL = "http://automobile-wiegand.de/api/api/vehicle";
        this._logger.debug('VehicleService - constructor - initialized');
    }
    VehicleService.prototype.getDropdown = function () {
        this._logger.debug('VehicleService - getDropdown');
        return this.dropdown;
    };
    VehicleService.prototype.loadDropdowns = function () {
        this._logger.debug('VehicleService - loadDropdowns');
        var categoriesMap = this.getFilteredDropdown();
        this.dropdown.categories = categoriesMap;
        this.dropdown.brands = categoriesMap[this.ANY_DEFAULT];
        this._logger.debug('VehicleService - loadDropdowns - categories: ' + this.dropdown.categories);
    };
    VehicleService.prototype.getFilteredDropdown = function () {
        // default category "Beliebig"
        var categoriesMap = {};
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
            var vehicle = this.vehicles[i];
            // get category
            var category = vehicle.category;
            var brand = vehicle.brandDescription;
            var model = vehicle.model;
            // map brand when category default and brand selected
            if (categoriesMap[this.ANY_DEFAULT][brand]) {
                // increase because brand is available
                categoriesMap[this.ANY_DEFAULT][brand].amount = categoriesMap[this.ANY_DEFAULT][brand].amount + 1;
            }
            else {
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
            }
            else {
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
            }
            else {
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
            }
            else {
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
            }
            else {
                // set new
                categoriesMap[category][brand][model] = {
                    value: model,
                    amount: 1
                };
            }
        }
        return categoriesMap;
    };
    VehicleService.prototype.getVehicles = function () {
        var _this = this;
        this._logger.debug('VehicleService - getVehicles');
        var url = this.BACKEND_URL;
        if (this.vehicles) {
            this._logger.debug('VehicleService - getVehicles - used cached vehicles: ');
            return Observable_1.Observable.of(this.vehicles);
        }
        else {
            return this.http.get(url)
                .map(function (response) {
                _this._logger.debug('VehicleService - getVehicles - map response: ' + response);
                _this.vehicles = response.json();
                _this.loadDropdowns();
                return _this.vehicles;
            });
        }
    };
    VehicleService.prototype.getVehicle = function (selectedVehicleId) {
        var _this = this;
        var url = this.BACKEND_URL + '/' + selectedVehicleId;
        return this.http.get(url).map(function (response) {
            _this._logger.debug('VehicleService - getSelectedVehicleById - map response: ' + response);
            return response.json();
        });
    };
    VehicleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.Logger, http_1.Http])
    ], VehicleService);
    return VehicleService;
}());
exports.VehicleService = VehicleService;
//# sourceMappingURL=list.service.js.map