/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Component, AfterViewChecked} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from 'angular2-logger/core';

import {VehicleService} from "../list/list.service";
import {AnalyticsService} from "../../util/analytics/analytics.service";

declare let $: any;

@Component({
  selector: 'detail-component',
  templateUrl: 'app/modules/detail/detail.component.html',
})

export class DetailComponent implements AfterViewChecked {

  vehicle: any = {
    features: {
      featuresInner: [],
      featuresOuter: [],
      featuresSafety: [],
    },
    engineSpecifics: {}
  };

  isGalleryLoaded : any = false;

  constructor(private _logger: Logger,
              private _route: ActivatedRoute,
              private _service: VehicleService,
              private _analytics: AnalyticsService) {
    this._logger.debug('DetailComponent - constructor - initialized');
    this.loadVehicle();
    this.reloadVehicleImageGalleryWhenResize();
  }

  ngAfterViewChecked() {
    if($('#gallery_thumbs').children().length <= 0){
      return;
    }

    //this._logger.debug('DetailComponent - ngAfterViewChecked - initialized');

    if(!this.isGalleryLoaded){
      this.loadVehicleGallery();
      this.isGalleryLoaded = true;
    }
  }

  private reloadVehicleImageGalleryWhenResize() {
    var loadVehicleGallery: any = this.loadVehicleGallery;
    //var logger = this._logger;
    var resizeTimer: any;
    $(window).resize(function () {
      //logger.debug('DetailComponent - reloadVehicleImageGalleryWhenResize - resized');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(loadVehicleGallery, 100);
    });
  }

  loadVehicleGallery() {
    $('#gallery_thumbs').children().each(function (i: any) {
      $(this).addClass('itm' + i);
      $(this).click(function () {
        $('#gallery_images').trigger('slideTo', [i, 0, true]);
        $('#gallery_thumbs a').removeClass('selected');
        $(this).addClass('selected');
        return false;
      });
    });
    $('#gallery_thumbs a.itm0').addClass('selected');
    $('#gallery_images').carouFredSel({
      infinite: false,
      circular: false,
      auto: false,
      width: '100%',
      scroll: {
        items: 1,
        fx: "crossfade"
      }
    });
    $('#gallery_thumbs').carouFredSel({
      prev: "#gallery_thumbs_prev",
      next: "#gallery_thumbs_next",
      infinite: false,
      circular: false,
      auto: false,
      width: '100%',
      scroll: {
        items: 1
      }
    });
    //activate pretty photo viewer
    //this._logger.debug("DetailComponent - loadVehicleGallery - prettyphoto loaded");
    $("a[rel^='prettyPhoto[gal]']").prettyPhoto({social_tools: false,
      deeplinking: false});//{theme:'facebook'}


  }

  private loadVehicle() {
    this._logger.debug('DetailComponent - loadVehicle');
    this._route.params.subscribe(params => {
      let selectedVehicleId = +params['id']; // (+) converts string 'id' to a number
      this._logger.debug('DetailComponent - loadVehicle - selectedVehicleId: ' + selectedVehicleId);
      this._service.getVehicle(selectedVehicleId).subscribe(
        (data: any) => {
          this._logger.debug('DetailComponent - loadVehicle - subscribed');
          this.vehicle = data;

          this.setDefaultImages();

          this.loadVehicleGallery();
        },
        (error: any) => {
          this._logger.debug("Error while downloading vehicle: " + error)
        }
      );
    });
  }

  private setDefaultImages() {
    if(!this.vehicle.vehicleImages || this.vehicle.vehicleImages.length === 0){
      this.vehicle.vehicleImages = [];
      this.vehicle.vehicleImages.push({
        xlurl : "images/logo/WiegandAutomobile.png",
        murl: "images/logo/Wiegand_Automobile.png"
      });
    }
  }

  onEmailSelect(){
    //this._analytics.sendEmailClicked()
  }
}

