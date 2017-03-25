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
var router_1 = require("@angular/router");
var core_2 = require('angular2-logger/core');
var list_service_1 = require("../list/list.service");
var analytics_service_1 = require("../../util/analytics/analytics.service");
var DetailComponent = (function () {
    function DetailComponent(_logger, _route, _service, _analytics) {
        this._logger = _logger;
        this._route = _route;
        this._service = _service;
        this._analytics = _analytics;
        this.vehicle = {
            features: {
                featuresInner: [],
                featuresOuter: [],
                featuresSafety: [],
            },
            engineSpecifics: {}
        };
        this.isGalleryLoaded = false;
        this._logger.debug('DetailComponent - constructor - initialized');
        this.loadVehicle();
        this.reloadVehicleImageGalleryWhenResize();
    }
    DetailComponent.prototype.ngAfterViewChecked = function () {
        if ($('#gallery_thumbs').children().length <= 0) {
            return;
        }
        //this._logger.debug('DetailComponent - ngAfterViewChecked - initialized');
        if (!this.isGalleryLoaded) {
            this.loadVehicleGallery();
            this.isGalleryLoaded = true;
        }
    };
    DetailComponent.prototype.reloadVehicleImageGalleryWhenResize = function () {
        var loadVehicleGallery = this.loadVehicleGallery;
        //var logger = this._logger;
        var resizeTimer;
        $(window).resize(function () {
            //logger.debug('DetailComponent - reloadVehicleImageGalleryWhenResize - resized');
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(loadVehicleGallery, 100);
        });
    };
    DetailComponent.prototype.loadVehicleGallery = function () {
        $('#gallery_thumbs').children().each(function (i) {
            $(this).addClass('itm' + i);
            $(this).click(function () {
                $('#gallery_images').trigger('slideTo', [i, 0, true]);
                $('#gallery_thumbs a').removeClass('selected');
                $(this).addClass('selected');
                return false;
            });
        });
        $('#gallery_thumbs a.itm0').addClass('selected');
        $('#gallery_images').carouFredSel({
            infinite: false,
            circular: false,
            auto: false,
            width: '100%',
            scroll: {
                items: 1,
                fx: "crossfade"
            }
        });
        $('#gallery_thumbs').carouFredSel({
            prev: "#gallery_thumbs_prev",
            next: "#gallery_thumbs_next",
            infinite: false,
            circular: false,
            auto: false,
            width: '100%',
            scroll: {
                items: 1
            }
        });
        //activate pretty photo viewer
        //this._logger.debug("DetailComponent - loadVehicleGallery - prettyphoto loaded");
        $("a[rel^='prettyPhoto[gal]']").prettyPhoto({ social_tools: false,
            deeplinking: false }); //{theme:'facebook'}
    };
    DetailComponent.prototype.loadVehicle = function () {
        var _this = this;
        this._logger.debug('DetailComponent - loadVehicle');
        this._route.params.subscribe(function (params) {
            var selectedVehicleId = +params['id']; // (+) converts string 'id' to a number
            _this._logger.debug('DetailComponent - loadVehicle - selectedVehicleId: ' + selectedVehicleId);
            _this._service.getVehicle(selectedVehicleId).subscribe(function (data) {
                _this._logger.debug('DetailComponent - loadVehicle - subscribed');
                _this.vehicle = data;
                _this.setDefaultImages();
                _this.loadVehicleGallery();
            }, function (error) {
                _this._logger.debug("Error while downloading vehicle: " + error);
            });
        });
    };
    DetailComponent.prototype.setDefaultImages = function () {
        if (!this.vehicle.vehicleImages || this.vehicle.vehicleImages.length === 0) {
            this.vehicle.vehicleImages = [];
            this.vehicle.vehicleImages.push({
                xlurl: "images/logo/WiegandAutomobile.png",
                murl: "images/logo/Wiegand_Automobile.png"
            });
        }
    };
    DetailComponent.prototype.onEmailSelect = function () {
        //this._analytics.sendEmailClicked()
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'detail-component',
            templateUrl: 'app/modules/detail/detail.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger, router_1.ActivatedRoute, list_service_1.VehicleService, analytics_service_1.AnalyticsService])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail.component.js.map