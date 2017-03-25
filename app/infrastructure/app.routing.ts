/**
 * Created by denielhorvatic on 21.12.16.
 */
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from "../modules/list/list.component";
import {DetailComponent} from "../modules/detail/detail.component";
import {ContactComponent} from "../modules/contact/contact.component";
import {LocationComponent} from "../modules/location/location.component";
import {ImprintComponent} from "../modules/imprint/imprint.component";

const appRoutes: Routes = [
  {
    path: 'prettyPhoto:anyArray/:anyNumber',
    redirectTo: 'unsere-autos/:id'
  },
  {
    path: 'unsere-autos',
    component: ListComponent
  }, {
    path: 'unsere-autos/:id',
    component: DetailComponent
  }, {
    path: 'kontakt',
    component: ContactComponent
  }, {
    path: 'anfahrt',
    component: LocationComponent
  }, {
    path: 'impressum',
    component: ImprintComponent
  },{
    path: '**',
    redirectTo: 'unsere-autos',
  },
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
