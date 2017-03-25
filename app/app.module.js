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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require("@angular/http");
var ng2_pagination_1 = require('ng2-pagination'); //importing ng2-pagination
var core_2 = require("angular2-logger/core");
var core_3 = require("angular2-logger/core");
var core_4 = require("angular2-logger/core");
var core_5 = require("angular2-logger/core");
var core_6 = require("angular2-logger/core");
var core_7 = require("angular2-logger/core");
var app_routing_1 = require("./infrastructure/app.routing");
var app_pipe_keys_1 = require("./util/app.pipe.keys");
var analytics_service_1 = require("./util/analytics/analytics.service");
var app_component_1 = require('./app.component');
var list_component_1 = require("./modules/list/list.component");
var list_service_1 = require("./modules/list/list.service");
var list_pipe_filter_1 = require("./modules/list/list.pipe.filter");
var detail_component_1 = require("./modules/detail/detail.component");
var contact_component_1 = require("./modules/contact/contact.component");
var location_component_1 = require("./modules/location/location.component");
var imprint_component_1 = require("./modules/imprint/imprint.component");
var list_pipe_search_1 = require("./modules/list/list.pipe.search");
var list_pipe_sort_1 = require("./modules/list/list.pipe.sort");
var navbar_component_1 = require("./modules/navbar/navbar.component");
var image_slider_component_1 = require("./modules/list/image-slider/image.slider.component");
var app_pipe_truncate_1 = require("./util/app.pipe.truncate");
var AppModule = (function () {
    function AppModule(_logger) {
        this._logger = _logger;
        this._logger.debug('AppModule - constructor - initialized');
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                app_routing_1.routing, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule
            ],
            declarations: [app_component_1.AppComponent, list_component_1.ListComponent, navbar_component_1.NavbarComponent, image_slider_component_1.ImageSliderComponent,
                detail_component_1.DetailComponent, contact_component_1.ContactComponent,
                location_component_1.LocationComponent, imprint_component_1.ImprintComponent,
                list_pipe_filter_1.FilterVehiclePipe, app_pipe_keys_1.KeysPipe, list_pipe_search_1.SearchVehiclePipe, list_pipe_sort_1.SortPipe, app_pipe_truncate_1.TruncatePipe
            ], providers: [core_2.Logger,
                core_3.ERROR_LOGGER_PROVIDERS,
                core_4.WARN_LOGGER_PROVIDERS,
                core_5.INFO_LOGGER_PROVIDERS,
                core_6.DEBUG_LOGGER_PROVIDERS,
                core_7.LOG_LOGGER_PROVIDERS,
                list_service_1.VehicleService, analytics_service_1.AnalyticsService,
                { provide: core_1.LOCALE_ID, useValue: "de-DE" },
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [core_2.Logger])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map