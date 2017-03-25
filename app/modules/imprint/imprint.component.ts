/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Component} from "@angular/core";
import {Logger} from 'angular2-logger/core';

@Component({
  selector: 'imprint-component',
  templateUrl: 'app/modules/imprint/imprint.component.html',
})

export class ImprintComponent{

  constructor(private _logger: Logger) {
    this._logger.debug('ImprintComponent - constructor - initialized');
  }

}

