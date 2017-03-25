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
var SearchVehiclePipe = (function () {
    function SearchVehiclePipe(_logger) {
        this._logger = _logger;
        this._logger.debug('SearchVehiclePipe - constructor - initialized');
    }
    SearchVehiclePipe.prototype.transform = function (vehicles, freeText) {
        this._logger.debug('SearchVehiclePipe - transform - vehicles: ' + vehicles);
        if (!vehicles || freeText == "")
            return vehicles;
        var freeTextLowerCase = freeText.toLowerCase();
        return vehicles.filter(function (vehicle) {
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
                return true;
            }
            return false;
        });
        /*if ((vehicle.brandDescription && vehicle.brandDescription.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
         || (vehicle.modelDescription && vehicle.modelDescription.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
         || (vehicle.category && vehicle.category.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))
         || (vehicle.model && vehicle.model.toLowerCase().match('^.*' + freeTextLowerCase + '.*$'))) {
         return true;
         }
         return false;*/
    };
    SearchVehiclePipe = __decorate([
        core_1.Pipe({
            name: 'SearchVehiclePipe'
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], SearchVehiclePipe);
    return SearchVehiclePipe;
}());
exports.SearchVehiclePipe = SearchVehiclePipe;
//# sourceMappingURL=list.pipe.search.js.map