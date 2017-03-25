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
var core_2 = require('angular2-logger/core');
var LocationComponent = (function () {
    function LocationComponent(_logger) {
        this._logger = _logger;
        this._logger.debug('LocationComponent - constructor - initialized');
    }
    LocationComponent.prototype.ngAfterViewInit = function () {
        $("#header_map").gMap({
            markers: [{
                    latitude: 49.531207,
                    longitude: 8.580859,
                    title: "Wiegand Automobile",
                    html: "<strong>Wiegand Automobile</strong> <br> Heidelbergerstrasse 30  <br> DE-68519 Viernheim  <br> E-Mail: wiegand-automobile@mobile.de <br>Tel.: +49 6204 6080716",
                    popup: false
                }],
            zoom: 12,
            scrollwheel: false
        });
        $("a[rel^='prettyPhoto[location]']").prettyPhoto({ social_tools: false,
            deeplinking: false }); //{theme:'facebook'}
    };
    LocationComponent = __decorate([
        core_1.Component({
            selector: 'location-component',
            templateUrl: 'app/modules/location/location.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], LocationComponent);
    return LocationComponent;
}());
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map