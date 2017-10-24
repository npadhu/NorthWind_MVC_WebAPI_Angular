"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var collections_1 = require("@angular/cdk/collections");
require("./rxjs-operators.js");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
var products_service_1 = require("./products.service");
var category_service_1 = require("./category.service");
var supplier_service_1 = require("./supplier.service");
var product_1 = require("./product");
var ProductListComponent = (function () {
    function ProductListComponent(prodService, categoryService, supplierService) {
        var _this = this;
        this.prodService = prodService;
        this.categoryService = categoryService;
        this.supplierService = supplierService;
        this._products = [];
        this.productsInPage = [];
        this.productDatabase = new SimpleDatabase();
        this.displayedColumns = ['ID', 'name', 'category', 'supplier'];
        this.showSpinner = false;
        this.supplierCtrl = new forms_1.FormControl();
        this.categoryCtrl = new forms_1.FormControl();
        this.filteredSupplier = this.supplierCtrl.valueChanges
            .startWith(null)
            .map(function (supp) { return supp && (typeof supp === 'object') ? supp.CompanyName : supp; })
            .map(function (supp) { return _this.filterSuppliers(supp); });
        this.filteredCategory = this.categoryCtrl.valueChanges
            .startWith(null)
            .map(function (cat) { return cat && (typeof cat === 'object') ? cat.CategoryName : cat; })
            .map(function (cat) { return _this.filterCategories(cat); });
    }
    Object.defineProperty(ProductListComponent.prototype, "products", {
        set: function (pd) {
            this._products = pd;
            this.productDatabase.setProductsData(pd);
            this._prdsSource = new ProductDataSource(this.productDatabase, this.productsPagniator);
            this.onPagination(null);
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.QueryProducts = function () {
        var _this = this;
        this.prodService.getProducts().subscribe(function (prod) { return _this.products = prod; }, function (error) { return _this.errorMessage = error; });
    };
    ProductListComponent.prototype.setModalInitializing = function () {
        var _this = this;
        this.modalInitializing = !this.detailProduct || !this.categories || !this.suppliers;
        if (!this.modalInitializing) {
            this.selectedSupplier = this.suppliers.find(function (s) { return s.SupplierID == _this.detailProduct.SupplierID; });
            this.selectedCategory = this.categories.find(function (s) { return s.CategoryID == _this.detailProduct.CategoryID; });
            this.modal.detailObject = Object.assign({}, this.detailProduct);
        }
    };
    ProductListComponent.prototype.ngOnInit = function () {
    };
    ProductListComponent.prototype.newProduct = function () {
        var _this = this;
        this.modalInitializing = true;
        this.detailProduct = new product_1.Product();
        this.detailProduct.ProductID = 0;
        this.detailProduct.ProductName = "";
        this.categories = null;
        this.suppliers = null;
        this.categoryService.getCategories().subscribe(function (cats) { return _this.categories = cats; }, function (error) { return _this.errorMessage = error; }, function () { return _this.setModalInitializing(); });
        this.supplierService.getSuppliers().subscribe(function (sups) { return _this.suppliers = sups; }, function (error) { return _this.errorMessage = error; }, function () { return _this.setModalInitializing(); });
        this.modal.detailObject = Object.assign({}, this.detailProduct);
        this.modal.open();
    };
    ProductListComponent.prototype.showDetails = function (id) {
        var _this = this;
        this.modalInitializing = true;
        this.detailProduct = null;
        this.categories = null;
        this.suppliers = null;
        this.prodService.getProductById(id).subscribe(function (prod) { return _this.detailProduct = prod; }, function (error) { return _this.errorMessage = error; }, function () { return _this.setModalInitializing(); });
        this.categoryService.getCategories().subscribe(function (cats) { return _this.categories = cats; }, function (error) { return _this.errorMessage = error; }, function () { return _this.setModalInitializing(); });
        this.supplierService.getSuppliers().subscribe(function (sups) { return _this.suppliers = sups; }, function (error) { return _this.errorMessage = error; }, function () { return _this.setModalInitializing(); });
        this.modal.detailObject = Object.assign({}, this.detailProduct);
        this.modal.open();
    };
    ProductListComponent.prototype.ngAfterViewInit = function () {
        this.QueryProducts();
    };
    ProductListComponent.prototype.setModalRef = function (modalRef) {
        this.modal = modalRef;
    };
    ProductListComponent.prototype.onPagination = function (pageEvent) {
        this.showSpinner = true;
        var start = this.productsPagniator.pageIndex * this.productsPagniator.pageSize;
        this.productsInPage = this._products.slice(start, start + this.productsPagniator.pageSize);
        this.showSpinner = false;
    };
    ProductListComponent.prototype.pNameErrorState = function (control, form) {
        // Error when invalid control is dirty, touched, or submitted
        var isSubmitted = form && form.submitted;
        return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    ProductListComponent.prototype.filterSuppliers = function (supp) {
        return supp ? ((typeof supp === 'object') ? this.suppliers.filter(function (sup) { return sup.CompanyName.toLowerCase().indexOf(supp.CompanyName.toLowerCase()) === 0; }) : this.suppliers.filter(function (sup) { return sup.CompanyName.toLowerCase().indexOf(supp.toLowerCase()) === 0; }))
            : this.suppliers;
    };
    ProductListComponent.prototype.supplierName = function (supp) {
        return supp ? (typeof supp === 'object') ? supp.CompanyName : supp.toString() : "";
    };
    ProductListComponent.prototype.setSupplier = function (supp) {
        if (supp && (typeof supp === 'object')) {
            this.selectedSupplier = supp;
            this.modal.detailObject.SupplierID = this.selectedSupplier.SupplierID;
        }
    };
    ProductListComponent.prototype.filterCategories = function (cat) {
        return cat ? ((typeof cat === 'object') ? this.categories.filter(function (c) { return c.CategoryName.toLowerCase().indexOf(cat.CategoryName.toLowerCase()) === 0; }) : this.categories.filter(function (c) { return c.CategoryName.toLowerCase().indexOf(cat.toLowerCase()) === 0; }))
            : this.categories;
    };
    ProductListComponent.prototype.categoryName = function (cat) {
        return cat ? (typeof cat === 'object') ? cat.CategoryName : cat.toString() : "";
    };
    ProductListComponent.prototype.setCategory = function (cat) {
        if (cat && (typeof cat === 'object')) {
            this.selectedCategory = cat;
            this.modal.detailObject.CategoryID = this.selectedCategory.CategoryID;
        }
    };
    ProductListComponent.prototype.SaveChanges = function (event) {
        if (this.detailProduct.ProductID == 0)
            this.prodService.AddProduct(this.modal.detailObject).subscribe({ error: function (error) { return console.log(error); } });
        else
            this.prodService.UpdateProductById(this.detailProduct.ProductID, this.modal.detailObject).subscribe({ error: function (error) { return console.log(error); } });
    };
    return ProductListComponent;
}());
__decorate([
    core_1.ViewChild('ProductsPg'),
    __metadata("design:type", material_1.MdPaginator)
], ProductListComponent.prototype, "productsPagniator", void 0);
ProductListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'product-list',
        templateUrl: 'productlist.component.html'
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService, category_service_1.CategoryService, supplier_service_1.SupplierService])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
var SimpleDatabase = (function () {
    function SimpleDatabase() {
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
    }
    Object.defineProperty(SimpleDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    SimpleDatabase.prototype.setProductsData = function (prods) {
        this.dataChange.next(prods);
    };
    return SimpleDatabase;
}());
exports.SimpleDatabase = SimpleDatabase;
var ProductDataSource = (function (_super) {
    __extends(ProductDataSource, _super);
    function ProductDataSource(_db, _paginator) {
        var _this = _super.call(this) || this;
        _this._db = _db;
        _this._paginator = _paginator;
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ProductDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this._db.dataChange,
            this._paginator.page,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            var data = _this._db.data.slice();
            // Grab the page's slice of data.
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            return data.splice(startIndex, _this._paginator.pageSize);
        });
    };
    ProductDataSource.prototype.disconnect = function () { };
    return ProductDataSource;
}(collections_1.DataSource));
exports.ProductDataSource = ProductDataSource;
//# sourceMappingURL=productlist.component.js.map