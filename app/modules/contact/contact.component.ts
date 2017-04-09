/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Component, AfterViewInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from 'angular2-logger/core';
import {VehicleService} from "../list/list.service";

declare let $: any;

@Component({
  selector: 'contact-component',
  templateUrl: 'app/modules/contact/contact.component.html',
})

export class ContactComponent implements AfterViewInit {

  private images = {
    contact : "images/header/6er.jpg",
    logo : "images/logo/WiegandAutomobile.png"
  };

  constructor(private _logger: Logger,
              private _route: ActivatedRoute,
              private _service: VehicleService) {
    this._logger.debug('ContactComponent - constructor - initialized');
  }

  ngAfterViewInit(): void {
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
    });//{theme:'facebook'}

  }
}

