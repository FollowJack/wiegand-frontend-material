/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import {Logger} from 'angular2-logger/core';

import {VehicleService} from "./list.service";
import {AnalyticsService} from "../../util/analytics/analytics.service";

declare let $: any;
declare let noUiSlider: any;
declare let wNumb: any;
declare let cuSel: any;
declare let ga: any;

@Component({
    selector: 'list-component',
    templateUrl: 'app/modules/list/list.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListComponent implements AfterViewInit {

    private ANY_DEFAULT: any = "Beliebig";

    private component = this;

    images: any = {
        headline1: "images/header/6er.jpg"
    };

    filter = {
        category: "",
        brand: "",
        model: "",
        minPrice: 0,
        maxPrice: 80000,
        freeText: ""
    };

    dropdown: any = {
        categories: {},
        brands: {},
        models: {},
        minPrices: [],
        maxPrices: []
    };

    isModelDisabled: any = true; // default disabled

    vehicles: any = [];

    fieldToSort = "lastModifiedSince";


    constructor(private _logger: Logger,
                private _router: Router,
                private _service: VehicleService,
                private _analyticsService: AnalyticsService) {
        this._logger.debug('ListComponent - constructor - initialized');

        //this.loadVehiclesAndDropdowns();
        //this.loadDropdowns();
    }

    ngAfterViewInit() {
        this._logger.debug('ListComponent - ngAfterViewInit');
        this.loadDropdowns();
        this.loadSlider();
        //this.loadSlider();
        //this.loadCarousel();
    }

    /*private loadVehiclesAndDropdowns() {
     this._logger.debug('ListComponent - loadVehiclesAndDropdowns');
     this._service.getVehicles().subscribe(
     (data: any) => {
     this._logger.debug('ListComponent - loadVehiclesAndDropdowns - subscribed');
     this.vehicles = data;
     //this._changeDetectorRef.detectChanges()
     },
     (error: any) => {
     this._logger.debug("Error with while downloading cars: " + error);
     }
     );
     }

     private loadDropdowns() {
     this._logger.debug('ListComponent - loadDropdowns');
     this.dropdown = this._service.getDropdown();
     }

     private onSort(fieldToSort: any) {

     if (fieldToSort === this.fieldToSort) {
     this.fieldToSort = "-" + this.fieldToSort;
     return;
     }

     this.fieldToSort = fieldToSort;
     }

     private onVehicleSelect(vehicle: any) {
     this._logger.debug('ListComponent - onVehicleSelect - selected id: ' + vehicle.id);
     this._router.navigate(['/unsere-autos', vehicle.id]);
     //analyze google select events
     this._analyticsService.sendVehicle(vehicle);
     //brand : car name : price
     }

     private onCategorySelect() {
     this._logger.debug('ListComponent - onCategorySelect - selected category: ' + this.filter.category);

     this.resetSearch();
     // case category not set then show default
     if (this.filter.category == "") {
     this.dropdown.brands = this.dropdown.categories[this.ANY_DEFAULT];
     this.isModelDisabled = true;
     } else { // show preselected category
     this.dropdown.brands = this.dropdown.categories[this.filter.category];
     // disable when brand is also default
     if (this.filter.brand == "") {
     this.isModelDisabled = false;
     }
     // disable model dropdown
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
     } else {
     this.dropdown.brands[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category].amount;
     }
     }

     private resetSearch() {
     this.filter.freeText = "";
     }

     private onBrandSelect() {
     this._logger.debug('ListComponent - onBrandSelect - selected brand: ' + this.filter.brand);
     // reset model

     if (this.filter.brand == "") {
     // enable model dropdown
     this.isModelDisabled = true;
     // category is empty
     if (this.filter.category == "") {
     this.dropdown.models = this.dropdown.categories[this.ANY_DEFAULT][this.ANY_DEFAULT];
     this.dropdown.models[this.ANY_DEFAULT] = {};
     //this.dropdown.models[this.ANY_DEFAULT].value = "";
     //this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.ANY_DEFAULT][this.ANY_DEFAULT].amount;
     } else { // category is set
     this.dropdown.models = this.dropdown.categories[this.filter.category][this.ANY_DEFAULT];
     this.dropdown.models[this.ANY_DEFAULT] = {};
     this.dropdown.models[this.ANY_DEFAULT].value = "";
     this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category][this.ANY_DEFAULT].amount;
     }
     } else { // brand is set
     // enable model dropdown
     this.isModelDisabled = false;
     // reset brand

     if (this.filter.category == "") {
     //this.filter.model = "";
     this.dropdown.models = this.dropdown.categories[this.ANY_DEFAULT][this.filter.brand];
     this.dropdown.models[this.ANY_DEFAULT] = {};
     this.dropdown.models[this.ANY_DEFAULT].value = "";
     this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.ANY_DEFAULT][this.filter.brand].amount;
     } else {
     this.dropdown.models = this.dropdown.categories[this.filter.category][this.filter.brand];
     this.dropdown.models[this.ANY_DEFAULT] = {};
     this.dropdown.models[this.ANY_DEFAULT].value = "";
     this.dropdown.models[this.ANY_DEFAULT].amount = this.dropdown.categories[this.filter.category][this.filter.brand].amount;
     }
     }
     // add default to the end
     this.filter.model = "";

     }

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
    private loadDropdowns() {
        $('select').material_select();
    }

    private loadSlider() {
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

    }
}