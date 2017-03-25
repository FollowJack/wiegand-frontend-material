/**
 * Created by denielhorvatic on 12.03.17.
 */
import {Component, AfterViewInit} from "@angular/core";
import {Logger} from 'angular2-logger/core';
import {Observable} from "rxjs/Rx";

declare var $: any;

@Component({
    selector: 'image-slider-component',
    templateUrl: 'app/modules/list/image-slider/image.slider.component.html',
})
export class ImageSliderComponent implements AfterViewInit {

    constructor(private _logger: Logger) {
        this._logger.debug('ImageSliderComponent - constructor - initialized');
    }

    ngAfterViewInit(): void {
        this.loadSlider();
    }

    private loadSlider() {
        this._logger.debug('ImageSliderComponent - constructor - initialized');
        $('.carousel.carousel-slider').carousel({fullWidth: true});
        let timer = Observable.timer(1000,4500);
        timer.subscribe(t => this.autoplay());
    }

    private autoplay() {
        $('.carousel').carousel('next');
    }
}