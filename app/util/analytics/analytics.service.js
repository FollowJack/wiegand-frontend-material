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
var AnalyticsService = (function () {
    function AnalyticsService(_logger) {
        this._logger = _logger;
        this.externalService = ga;
        this._logger.debug('AnalyticsService - constructor - initialized');
    }
    AnalyticsService.prototype.sendVehicle = function (vehicle) {
        this._logger.debug('AnalyticsService - sendVehicle - called for vehicle: ' + vehicle.id);
        this.externalService('send', {
            hitType: 'event',
            eventCategory: 'vehicle click:',
            eventAction: vehicle.brandDescription + ', ' + vehicle.modelDescription,
            eventLabel: vehicle.category + ', ' + vehicle.consumerPriceAmount
        });
    };
    AnalyticsService.prototype.sendPageView = function (newRoute) {
        this._logger.debug('AnalyticsService - sendPageView - new view: ' + newRoute);
        this.externalService('set', 'page', newRoute);
        this.externalService('send', 'pageview');
    };
    AnalyticsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], AnalyticsService);
    return AnalyticsService;
}());
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map