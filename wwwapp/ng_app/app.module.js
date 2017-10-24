"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var table_1 = require("@angular/cdk/table");
var $ = require('jquery');
var products_service_1 = require("./products.service");
var app_component_1 = require("./app.component");
var productlist_component_1 = require("./productlist.component");
var modal_component_1 = require("./modal.component");
var category_service_1 = require("./category.service");
var supplier_service_1 = require("./supplier.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            animations_1.BrowserAnimationsModule,
            material_1.MdInputModule,
            material_1.MdButtonModule,
            material_1.MdCheckboxModule,
            material_1.MdPaginatorModule,
            table_1.CdkTableModule,
            material_1.MdAutocompleteModule,
            material_1.MdFormFieldModule,
            material_1.MdOptionModule,
            material_1.MdTableModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            productlist_component_1.ProductListComponent,
            modal_component_1.ModalComponent
        ],
        providers: [products_service_1.ProductsService, category_service_1.CategoryService, supplier_service_1.SupplierService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map