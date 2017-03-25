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
var list_service_1 = require("./list.service");
var analytics_service_1 = require("../../util/analytics/analytics.service");
var ListComponent = (function () {
    function ListComponent(_logger, _router, _service, _analyticsService) {
        this._logger = _logger;
        this._router = _router;
        this._service = _service;
        this._analyticsService = _analyticsService;
        this.ANY_DEFAULT = "Beliebig";
        this.component = this;
        this.images = {
            headline1: "images/header/6er.jpg"
        };
        this.filter = {
            category: "",
            brand: "",
            model: "",
            minPrice: 0,
            maxPrice: 80000,
            freeText: ""
        };
        this.dropdown = {
            categories: {},
            brands: {},
            models: {},
            minPrices: [],
            maxPrices: []
        };
        this.isModelDisabled = true; // default disabled
        this.vehicles = [];
        this.fieldToSort = "lastModifiedSince";
        this._logger.debug('ListComponent - constructor - initialized');
        this.loadVehiclesAndDropdowns();
        this.loadDropdowns();
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug('ListComponent - ngAfterViewInit');
        this.loadDropdowns();
        this.loadSlider();
        //this.loadSlider();
        //this.loadCarousel();
    };
    ListComponent.prototype.loadVehiclesAndDropdowns = function () {
        var _this = this;
        this._logger.debug('ListComponent - loadVehiclesAndDropdowns');
        this._service.getVehicles().subscribe(function (data) {
            _this._logger.debug('ListComponent - loadVehiclesAndDropdowns - subscribed');
            _this.vehicles = data;
            //this._changeDetectorRef.detectChanges()
        }, function (error) {
            _this._logger.debug("Error with while downloading cars: " + error);
        });
    };
    ListComponent.prototype.loadDropdowns = function () {
        this._logger.debug('ListComponent - loadDropdowns');
        this.dropdown = this._service.getDropdown();
    };
    ListComponent.prototype.onSort = function (fieldToSort) {
        if (fieldToSort === this.fieldToSort) {
            this.fieldToSort = "-" + this.fieldToSort;
            return;
        }
        this.fieldToSort = fieldToSort;
    };
    ListComponent.prototype.onVehicleSelect = function (vehicle) {
        this._logger.debug('ListComponent - onVehicleSelect - selected id: ' + vehicle.id);
        this._router.navigate(['/unsere-autos', vehicle.id]);
        //analyze google select events
        this._analyticsService.sendVehicle(vehicle);
        //brand : car name : price
    };
    ListComponent.prototype.onCategorySelect = function () {
        this._logger.debug('ListComponent - onCategorySelect - selected category: ' + this.filter.category);
        this.resetSearch();
        // case category not set then show default
        if (this.filter.category == "") {
            this.dropdown.brands = this.dropdown.categories[this.ANY_DEFAULT];
            this.isModelDisabled = true;
        }
        else {
            this.dropdown.brands = this.dropdown.categories[this.filter.category];
            // disable when brand is also default
            if (this.filter.brand == "") {
                this.isModelDisabled = false;
            }
        }
        // reset filter
        this.filter.brand = "";
        this.filter.model = "";
        // reset brand
        this.dropdown.brands[this.ANY_DEFAULT] = {};
        this.dropdown.brands[this.ANY_DEFAULT].value = "";
        this.dropdown.models = [];
        // reset amount of category
        if (this.filter.category == "") {
            this.dropdown.brands[this.ANY_DEFAULT].amount = this.dropdown.categories[this.ANY_DEFAULT].amount;
        }
        else {
            this.dropdown.brands[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category].amount;
        }
    };
    ListComponent.prototype.resetSearch = function () {
        this.filter.freeText = "";
    };
    ListComponent.prototype.onBrandSelect = function () {
        this._logger.debug('ListComponent - onBrandSelect - selected brand: ' + this.filter.brand);
        // reset model
        if (this.filter.brand == "") {
            // enable model dropdown
            this.isModelDisabled = true;
            // category is empty
            if (this.filter.category == "") {
                this.dropdown.models = this.dropdown.categories[this.ANY_DEFAULT][this.ANY_DEFAULT];
                this.dropdown.models[this.ANY_DEFAULT] = {};
            }
            else {
                this.dropdown.models = this.dropdown.categories[this.filter.category][this.ANY_DEFAULT];
                this.dropdown.models[this.ANY_DEFAULT] = {};
                this.dropdown.models[this.ANY_DEFAULT].value = "";
                this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category][this.ANY_DEFAULT].amount;
            }
        }
        else {
            // enable model dropdown
            this.isModelDisabled = false;
            // reset brand
            if (this.filter.category == "") {
                //this.filter.model = "";
                this.dropdown.models = this.dropdown.categories[this.ANY_DEFAULT][this.filter.brand];
                this.dropdown.models[this.ANY_DEFAULT] = {};
                this.dropdown.models[this.ANY_DEFAULT].value = "";
                this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.ANY_DEFAULT][this.filter.brand].amount;
            }
            else {
                this.dropdown.models = this.dropdown.categories[this.filter.category][this.filter.brand];
                this.dropdown.models[this.ANY_DEFAULT] = {};
                this.dropdown.models[this.ANY_DEFAULT].value = "";
                this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category][this.filter.brand].amount;
            }
        }
        // add default to the end
        this.filter.model = "";
    };
    /*
     private loadSlider() {
     var filter = this.filter;
     this._logger.debug('ListComponent - loadSlider');
     $("#price_range").slider({
     from: 100,
     to: 100000,
     limits: false,
     scale: ['100', '100k'],
     heterogeneity: ['50/50000'],
     step: 100,
     smooth: true,
     format: {format: '##', locale: 'de'},
     dimension: '€',
     skin: "round_blue",
     callback: function () {
     var values = $("#price_range").slider("calculatedValue").split(";");
     var minPrice = values[0];
     var maxPrice = values[1];
     filter.minPrice = minPrice;
     filter.maxPrice = maxPrice;
     }
     });
     }

     private loadCarousel() {
     if ($.fn.cssOriginal != undefined)
     $.fn.css = $.fn.cssOriginal;

     $('.fullwidthbanner').revolution({
     delay: 5000,
     startwidth: 950,
     startheight: 617,

     onHoverStop: "off",						// Stop Banner Timet at Hover on Slide on/off
     hideThumbs: 0,
     navigationType: "bullet",				// bullet, thumb, none
     navigationArrows: "none",				// nexttobullets, solo (old name verticalcentered), none

     navigationStyle: "round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom

     navigationHAlign: "center",				// Vertical Align top,center,bottom
     navigationVAlign: "bottom",				// Horizontal Align left,center,right
     navigationHOffset: 0,
     navigationVOffset: 23,

     touchenabled: "on",						// Enable Swipe Function : on/off

     stopAtSlide: -1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
     stopAfterLoops: -1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

     hideCaptionAtLimit: 0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
     hideAllCaptionAtLilmit: 0,				// Hide all The Captions if Width of Browser is less then this value
     hideSliderAtLimit: 0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

     fullWidth: "on",
     shadow: 0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

     });
     }*/
    ListComponent.prototype.loadDropdowns = function () {
        $('select').material_select();
    };
    ListComponent.prototype.loadSlider = function () {
        var slider = document.getElementById('price-range');
        noUiSlider.create(slider, {
            start: [1000, 60000],
            connect: true,
            step: 1,
            range: {
                'min': 1000,
                'max': 80000
            },
            format: wNumb({
                decimals: 0
            })
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'list-component',
            templateUrl: 'app/modules/list/list.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger, router_1.Router, list_service_1.VehicleService, analytics_service_1.AnalyticsService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map