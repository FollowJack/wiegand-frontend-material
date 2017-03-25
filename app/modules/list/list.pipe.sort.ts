/**
 * Created by denielhorvatic on 01.03.17.
 */
import {Pipe} from "@angular/core";

@Pipe({
  name: "orderBy",
  pure: true
})
export class SortPipe {
  transform(vehicles: Array<any>, fieldToSort: string): Array<string> {

    return vehicles.sort((a: any, b: any) => {
        var vehicle1: any, vehicle2: any;

        if (fieldToSort === "consumerPriceAmount" || fieldToSort === "-consumerPriceAmount") {
          vehicle1 = parseFloat(a['consumerPriceAmount']);
          vehicle2 = parseFloat(b['consumerPriceAmount']);
        } else if (fieldToSort === "firstRegistration" || fieldToSort === "-firstRegistration") {
          vehicle1 = Date.parse(a['engineSpecifics']['firstRegistration']);
          vehicle2 = Date.parse(b['engineSpecifics']['firstRegistration']);
        } else if (fieldToSort === "mileAge" || fieldToSort === "-mileAge") {
          vehicle1 = parseInt(a['engineSpecifics']['mileAge']);
          vehicle2 = parseInt(b['engineSpecifics']['mileAge']);
        } else if (fieldToSort === "lastModifiedSince" || fieldToSort === "-lastModifiedSince") {
          vehicle1 = parseInt(a['lastModifiedSince']);
          vehicle2 = parseInt(b['lastModifiedSince']);
        }

        // swap if negative sign is in front
        if (fieldToSort.startsWith("-", 0)) {
          var temp = vehicle1;
          vehicle1 = vehicle2;
          vehicle2 = temp;
        }

        if (vehicle1 < vehicle2) {
          return -1;
        } else if (vehicle1 > vehicle2) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }
}
