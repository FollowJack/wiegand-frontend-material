/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";

declare let ga : any;

@Injectable()
export class AnalyticsService {

  private externalService: any = ga;

  constructor(private _logger: Logger) {
    this._logger.debug('AnalyticsService - constructor - initialized');
  }

  sendVehicle(vehicle:any){
    this._logger.debug('AnalyticsService - sendVehicle - called for vehicle: '+ vehicle.id);

    this.externalService('send', {
      hitType: 'event',
      eventCategory: 'vehicle click:',
      eventAction: vehicle.brandDescription+', ' + vehicle.modelDescription,
      eventLabel: vehicle.category + ', ' + vehicle.consumerPriceAmount
    });
  }

  sendPageView(newRoute:any) {
    this._logger.debug('AnalyticsService - sendPageView - new view: '+ newRoute);
    this.externalService('set', 'page', newRoute);
    this.externalService('send', 'pageview');
  }
}
