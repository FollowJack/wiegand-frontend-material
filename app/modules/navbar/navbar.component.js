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
var NavbarComponent = (function () {
    function NavbarComponent(_logger) {
        this._logger = _logger;
        this.images = {
            logo: "/images/logo/logo_white_cutted.png"
        };
        this._logger.debug('NavbarComponent - constructor - initialized');
    }
    NavbarComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug('NavbarComponent - ngAfterViewInit - initialized');
        this.loadNavbar();
    };
    NavbarComponent.prototype.loadNavbar = function () {
        this._logger.debug('NavbarComponent - loadNavbar - initialized');
        $(".button-collapse").sideNav();
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar-component',
            templateUrl: 'app/modules/navbar/navbar.component.html',
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map