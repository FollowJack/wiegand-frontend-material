import {NgModule, LOCALE_ID}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {Ng2PaginationModule} from 'ng2-pagination'; //importing ng2-pagination

import {Logger} from "angular2-logger/core";
import {ERROR_LOGGER_PROVIDERS} from "angular2-logger/core";
import {WARN_LOGGER_PROVIDERS} from "angular2-logger/core";
import {INFO_LOGGER_PROVIDERS} from "angular2-logger/core";
import {DEBUG_LOGGER_PROVIDERS} from "angular2-logger/core";
import {LOG_LOGGER_PROVIDERS} from "angular2-logger/core";

import {routing} from "./infrastructure/app.routing";
import {KeysPipe} from "./util/app.pipe.keys";
import {AnalyticsService} from "./util/analytics/analytics.service";

import {AppComponent}  from './app.component';
import {ListComponent} from "./modules/list/list.component";
import {VehicleService} from "./modules/list/list.service";
import {FilterVehiclePipe} from "./modules/list/list.pipe.filter";
import {DetailComponent} from "./modules/detail/detail.component";
import {ContactComponent} from "./modules/contact/contact.component";
import {LocationComponent} from "./modules/location/location.component";
import {ImprintComponent} from "./modules/imprint/imprint.component";
import {SearchVehiclePipe} from "./modules/list/list.pipe.search";
import {SortPipe} from "./modules/list/list.pipe.sort";
import {NavbarComponent} from "./modules/navbar/navbar.component";
import {ImageSliderComponent} from "./modules/list/image-slider/image.slider.component";

@NgModule({
  imports: [BrowserModule,
    routing, FormsModule, HttpModule, Ng2PaginationModule
  ],
  declarations: [AppComponent, ListComponent, NavbarComponent, ImageSliderComponent,
    DetailComponent, ContactComponent,
    LocationComponent, ImprintComponent,
    FilterVehiclePipe, KeysPipe, SearchVehiclePipe, SortPipe
  ], providers: [Logger,
    ERROR_LOGGER_PROVIDERS,
    WARN_LOGGER_PROVIDERS,
    INFO_LOGGER_PROVIDERS,
    DEBUG_LOGGER_PROVIDERS,
    LOG_LOGGER_PROVIDERS,
    VehicleService, AnalyticsService,
    {provide: LOCALE_ID, useValue: "de-DE"},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _logger: Logger) {
    this._logger.debug('AppModule - constructor - initialized');
  }

}
