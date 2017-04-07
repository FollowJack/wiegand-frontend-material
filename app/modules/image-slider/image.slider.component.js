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
 * Created by denielhorvatic on 12.03.17.
 */
var core_1 = require("@angular/core");
var core_2 = require('angular2-logger/core');
var ImageSliderComponent = (function () {
    function ImageSliderComponent(_logger) {
        this._logger = _logger;
        this.images = {
            headline1: "images/header/6er.jpg",
            headline2: "images/car_dealer/DSC_0078.JPG",
            headline3: "images/car_dealer/DSC_0070.JPG",
            headline4: "images/car_dealer/DSC_0072.JPG",
        };
        this._logger.debug('ImageSliderComponent - constructor - initialized');
    }
    ImageSliderComponent.prototype.ngAfterViewInit = function () {
        this.loadSlider();
    };
    ImageSliderComponent.prototype.loadSlider = function () {
        this._logger.debug('ImageSliderComponent - loadSlider - initialized');
        $('.slider').slider();
    };
    ImageSliderComponent = __decorate([
        core_1.Component({
            selector: 'image-slider-component',
            templateUrl: 'app/modules/image-slider/image.slider.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], ImageSliderComponent);
    return ImageSliderComponent;
}());
exports.ImageSliderComponent = ImageSliderComponent;
//# sourceMappingURL=image.slider.component.js.map