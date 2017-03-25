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
var router_1 = require("@angular/router");
var core_2 = require("angular2-logger/core");
var analytics_service_1 = require("./util/analytics/analytics.service");
var common_1 = require('@angular/common');
var AppComponent = (function () {
    function AppComponent(_logger, _router, _location, _analyticsService) {
        this._logger = _logger;
        this._router = _router;
        this._location = _location;
        this._analyticsService = _analyticsService;
        this.name = 'Angular';
        this.images = {
            logo: "images/logo/logo_white_cutted.png"
        };
        this._logger.debug('AppComponent - constructor - initialized');
        this.trackPageVisit(_router, _analyticsService);
    }
    AppComponent.prototype.trackPageVisit = function (_router, _analyticsService) {
        var _this = this;
        this._logger.debug('AppComponent - trackPageVisit - initialized');
        this._router.events.subscribe(function (event) {
            // Send GA tracking on NavigationEnd event. You may wish to add other
            // logic here too or change which event to work with
            if (event instanceof router_1.NavigationEnd) {
                _this._logger.debug('AppComponent - trackPageVisit - NavigationEnd');
                // When the route is '/', location.path actually returns ''.
                var newRoute = _this._location.path() || '/';
                // If the route has changed, send the new route to analytics.
                if (_this.currentRoute != newRoute) {
                    _analyticsService.sendPageView(newRoute);
                    _this.currentRoute = newRoute;
                }
            }
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug('AppComponent - ngAfterViewInit - initialized');
        this.loadWelcomeScreen();
        this.scrollPageToTop();
    };
    AppComponent.prototype.navigateTo = function (value) {
        if (value) {
            this._router.navigate([value]);
        }
        return false;
    };
    AppComponent.prototype.loadWelcomeScreen = function () {
        this._logger.debug('AppComponent - loadWelcomeScreen - initialized');
        setTimeout(function () {
            $('#preloader').velocity({
                opacity: "0",
                complete: function () {
                    $("#loading").velocity("fadeOut", {
                        duration: 1000,
                        easing: [0.7, 0, 0.3, 1],
                    });
                }
            });
        }, 1000);
    };
    AppComponent.prototype.scrollPageToTop = function () {
        this._router.events.subscribe(function (event) {
            if (!(event instanceof router_1.NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [core_2.Logger, router_1.Router, common_1.Location, analytics_service_1.AnalyticsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map