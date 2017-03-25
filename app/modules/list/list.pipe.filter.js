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
var core_1 = require('@angular/core');
var core_2 = require("angular2-logger/core");
var FilterVehiclePipe = (function () {
    function FilterVehiclePipe(_logger) {
        this._logger = _logger;
        this._logger.debug('FilterVehiclePipe - constructor - initialized');
    }
    FilterVehiclePipe.prototype.transform = function (vehicles, category, brand, model, minPrice, maxPrice) {
        this._logger.debug('FilterVehiclePipe - transform - vehicles: ' + vehicles);
        this._logger.debug('FilterVehiclePipe - transform - category: ' + category);
        this._logger.debug('FilterVehiclePipe - transform - brand: ' + brand);
        this._logger.debug('FilterVehiclePipe - transform - model: ' + model);
        this._logger.debug('FilterVehiclePipe - transform - minPrice: ' + minPrice);
        this._logger.debug('FilterVehiclePipe - transform - maxPrice: ' + maxPrice);
        if (!vehicles)
            return vehicles;
        return vehicles.filter(function (vehicle) {
            if (category && vehicle.category !== category)
                return false;
            if (brand && vehicle.brandDescription.indexOf(brand) === -1)
                return false;
            if (model && vehicle.model !== model)
                return false;
            // minPrice bigger than maxPrice --> swap
            if (Number(minPrice) > Number(maxPrice)) {
                var temp = minPrice;
                minPrice = maxPrice;
                maxPrice = temp;
            }
            if (minPrice && Number(vehicle.consumerPriceAmount) < Number(minPrice))
                return false;
            if (maxPrice && Number(vehicle.consumerPriceAmount) > Number(maxPrice))
                return false;
            return true;
        });
    };
    FilterVehiclePipe = __decorate([
        core_1.Pipe({
            name: 'FilterVehiclePipe'
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], FilterVehiclePipe);
    return FilterVehiclePipe;
}());
exports.FilterVehiclePipe = FilterVehiclePipe;
//# sourceMappingURL=list.pipe.filter.js.map