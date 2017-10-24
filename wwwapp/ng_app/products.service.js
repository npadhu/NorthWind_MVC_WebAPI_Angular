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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var observable_1 = require("rxjs/observable");
var ProductsService = (function () {
    function ProductsService(http) {
        this.http = http;
        this.allproductsUrl = "api/Products";
        this.productByIdUrl = "api/Products/";
        this.addProductUrl = "api/Products/";
    }
    ProductsService.prototype.extractData = function (response) {
        console.log(response.json());
        return response.json();
    };
    ProductsService.prototype.handlError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return observable_1.Observable.throw(errMsg);
    };
    ProductsService.prototype.getProducts = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.allproductsUrl, options)
            .map(this.extractData)
            .catch(this.handlError);
    };
    ProductsService.prototype.getProductById = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.productByIdUrl + "/" + id.toString(), options)
            .map(this.extractData)
            .catch(this.handlError);
    };
    ProductsService.prototype.UpdateProductById = function (id, product) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(product);
        return this.http.put(this.productByIdUrl + "/" + id.toString(), body, options)
            .catch(this.handlError);
    };
    ProductsService.prototype.AddProduct = function (prod) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(prod);
        return this.http.post(this.addProductUrl, body, options)
            .catch(this.handlError);
    };
    return ProductsService;
}());
ProductsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map