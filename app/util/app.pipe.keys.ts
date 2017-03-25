/**
 * Created by denielhorvatic on 23.12.16.
 */
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args:string[]) : any {
    if (!value) {
      return value;
    }

    let keys: any = [];
    for (let key in value) {

      if(key == "value" || key == "amount")
        continue;

      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
