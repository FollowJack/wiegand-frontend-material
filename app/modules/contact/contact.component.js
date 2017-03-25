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
var ContactComponent = (function () {
    function ContactComponent(_logger, _route, _service) {
        this._logger = _logger;
        this._route = _route;
        this._service = _service;
        this._logger.debug('ContactComponent - constructor - initialized');
    }
    ContactComponent.prototype.ngAfterViewInit = function () {
        $("#header_map").gMap({
            markers: [{
                    latitude: 40.713305,
                    longitude: -73.98581,
                    title: "Wiegand Automobile",
                    html: "<strong>Wiegand Automobile</strong> <br> Heidelberger Str. 30 D- 68519 Viernheim <br>Tel.: 555-522.326",
                    popup: false,
                    icon: {
                        image: 'images/icons/map-marker-icon.png',
                        iconsize: [37, 44],
                        iconanchor: [37, 88],
                        infowindowanchor: [0, 0]
                    }
                }],
            zoom: 15,
            scrollwheel: false
        });
        $("a[rel^='prettyPhoto[show]']").prettyPhoto({
            social_tools: false,
            deeplinking: false
        }); //{theme:'facebook'}
    };
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact-component',
            templateUrl: 'app/modules/contact/contact.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger, router_1.ActivatedRoute, list_service_1.VehicleService])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map