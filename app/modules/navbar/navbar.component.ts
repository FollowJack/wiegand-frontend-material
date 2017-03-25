/**
 * Created by denielhorvatic on 12.03.17.
 */
import {Component} from "@angular/core";
import {Logger} from 'angular2-logger/core';

declare var $: any;

@Component({
    selector: 'navbar-component',
    templateUrl: 'app/modules/navbar/navbar.component.html',
})
export class NavbarComponent {

    public images: any = {
        logo: "/images/logo/logo_white_cutted.png"
    };

    constructor(private _logger: Logger) {
        this._logger.debug('NavbarComponent - constructor - initialized');
        this.loadNavbar();
    }

    private loadNavbar() {
        this._logger.debug('NavbarComponent - loadNavbar - initialized');
        $(".button-collapse").sideNav();
    }
}