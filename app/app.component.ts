import {Component, AfterViewInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {Logger} from "angular2-logger/core";
import {AnalyticsService} from "./util/analytics/analytics.service";
import {Location} from '@angular/common';

declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent implements AfterViewInit {
    name = 'Angular';

    images: any = {
        logo: "images/logo/logo_white_cutted.png"
    };

    private currentRoute: string;

    constructor(private _logger: Logger,
                private _router: Router,
                private _location: Location,
                private _analyticsService: AnalyticsService) {
        this._logger.debug('AppComponent - constructor - initialized');
        this.trackPageVisit(_router, _analyticsService);
    }

    private trackPageVisit(_router: Router, _analyticsService: AnalyticsService) {
        this._logger.debug('AppComponent - trackPageVisit - initialized');
        this._router.events.subscribe((event: any) => {
            // Send GA tracking on NavigationEnd event. You may wish to add other
            // logic here too or change which event to work with
            if (event instanceof NavigationEnd) {
                this._logger.debug('AppComponent - trackPageVisit - NavigationEnd');


                // When the route is '/', location.path actually returns ''.
                let newRoute = this._location.path() || '/';
                // If the route has changed, send the new route to analytics.
                if (this.currentRoute != newRoute) {
                    _analyticsService.sendPageView(newRoute);
                    this.currentRoute = newRoute;
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this._logger.debug('AppComponent - ngAfterViewInit - initialized');
        this.scrollPageToTop();
    }

    navigateTo(value: any) {
        if (value) {
            this._router.navigate([value]);
        }
        return false;
    }

    private scrollPageToTop() {
        this._router.events.subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }
}
