"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by denielhorvatic on 01.03.17.
 */
var core_1 = require("@angular/core");
var SortPipe = (function () {
    function SortPipe() {
    }
    SortPipe.prototype.transform = function (vehicles, fieldToSort) {
        return vehicles.sort(function (a, b) {
            var vehicle1, vehicle2;
            if (fieldToSort === "consumerPriceAmount" || fieldToSort === "-consumerPriceAmount") {
                vehicle1 = parseFloat(a['consumerPriceAmount']);
                vehicle2 = parseFloat(b['consumerPriceAmount']);
            }
            else if (fieldToSort === "firstRegistration" || fieldToSort === "-firstRegistration") {
                vehicle1 = Date.parse(a['engineSpecifics']['firstRegistration']);
                vehicle2 = Date.parse(b['engineSpecifics']['firstRegistration']);
            }
            else if (fieldToSort === "mileAge" || fieldToSort === "-mileAge") {
                vehicle1 = parseInt(a['engineSpecifics']['mileAge']);
                vehicle2 = parseInt(b['engineSpecifics']['mileAge']);
            }
            else if (fieldToSort === "lastModifiedSince" || fieldToSort === "-lastModifiedSince") {
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
            }
            else if (vehicle1 > vehicle2) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    SortPipe = __decorate([
        core_1.Pipe({
            name: "orderBy",
            pure: true
        }), 
        __metadata('design:paramtypes', [])
    ], SortPipe);
    return SortPipe;
}());
exports.SortPipe = SortPipe;
//# sourceMappingURL=list.pipe.sort.js.map