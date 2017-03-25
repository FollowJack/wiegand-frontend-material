/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Component, AfterViewChecked, AfterViewInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from 'angular2-logger/core';
import {VehicleService} from "../list/list.service";

declare var $: any;
declare var google: any;

@Component({
  selector: 'location-component',
  templateUrl: 'app/modules/location/location.component.html',
})

export class LocationComponent implements AfterViewInit {

  constructor(private _logger: Logger) {
    this._logger.debug('LocationComponent - constructor - initialized');
  }

  ngAfterViewInit(): void {
    $("#header_map").gMap({
      markers: [{
        latitude: 49.531207,
        longitude: 8.580859,
        title: "Wiegand Automobile",
        html: "<strong>Wiegand Automobile</strong> <br> Heidelbergerstrasse 30  <br> DE-68519 Viernheim  <br> E-Mail: wiegand-automobile@mobile.de <br>Tel.: +49 6204 6080716",
        popup: false
        /*icon: {
         image: 'images/icons/map-marker-icon.png',
         iconsize: [48, 80],
         iconanchor: [17,44],
         infowindowanchor: [0, 0]
         }
         */
      }],
      zoom: 12,
      scrollwheel: false
    });

    $("a[rel^='prettyPhoto[location]']").prettyPhoto({social_tools: false,
      deeplinking: false});//{theme:'facebook'}
  }


}

