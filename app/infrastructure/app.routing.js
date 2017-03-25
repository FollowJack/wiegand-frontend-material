"use strict";
/**
 * Created by denielhorvatic on 21.12.16.
 */
var router_1 = require('@angular/router');
var list_component_1 = require("../modules/list/list.component");
var detail_component_1 = require("../modules/detail/detail.component");
var contact_component_1 = require("../modules/contact/contact.component");
var location_component_1 = require("../modules/location/location.component");
var imprint_component_1 = require("../modules/imprint/imprint.component");
var appRoutes = [
    {
        path: 'prettyPhoto:anyArray/:anyNumber',
        redirectTo: 'unsere-autos/:id'
    },
    {
        path: 'unsere-autos',
        component: list_component_1.ListComponent
    }, {
        path: 'unsere-autos/:id',
        component: detail_component_1.DetailComponent
    }, {
        path: 'kontakt',
        component: contact_component_1.ContactComponent
    }, {
        path: 'anfahrt',
        component: location_component_1.LocationComponent
    }, {
        path: 'impressum',
        component: imprint_component_1.ImprintComponent
    }, {
        path: '**',
        redirectTo: 'unsere-autos',
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map