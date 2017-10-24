import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";

import { MdPaginator, PageEvent } from "@angular/material";
import { FormGroupDirective, FormControl, NgForm } from "@angular/forms";
import { DataSource } from '@angular/cdk/collections';

import "./rxjs-operators.js";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';

import { ProductsService } from "./products.service"
import { CategoryService } from "./category.service"
import { SupplierService } from "./supplier.service"

import { Product } from "./product"
import { ProductListItem } from "./productlistitem"
import { Supplier } from "./supplier"
import { Category } from "./Category"

import { ModalComponent } from "./modal.component"

@Component({
    moduleId: module.id,
    selector: 'product-list',
    templateUrl: 'productlist.component.html'
})

export class ProductListComponent implements OnInit, AfterViewInit {
    _products: ProductListItem[] = [];
				productsInPage: ProductListItem[] = [];

				productDatabase = new SimpleDatabase();
				_prdsSource: ProductDataSource;
				displayedColumns = ['ID', 'name', 'category', 'supplier'];

    detailProduct: Product;
    suppliers: Supplier[];
    categories: Category[];

    @ViewChild('ProductsPg') productsPagniator: MdPaginator;

    errorMessage: string;
    showSpinner: boolean;
    modalInitializing: boolean;

    modal: ModalComponent;
    supplierCtrl: FormControl;
    categoryCtrl: FormControl;

    filteredSupplier: Observable<any[]>;
    filteredCategory: Observable<any[]>;
    selectedSupplier: Supplier;
    selectedCategory: Category;

    set products(pd: ProductListItem[]) {
								this._products = pd;
								this.productDatabase.setProductsData(pd);
								this._prdsSource = new ProductDataSource(this.productDatabase, this.productsPagniator);
        this.onPagination(null);
    }

    QueryProducts() {
        this.prodService.getProducts().subscribe(prod => this.products = prod, error => this.errorMessage = <any>error);
    }

    constructor(private prodService: ProductsService, private categoryService: CategoryService, private supplierService: SupplierService) {
        this.showSpinner = false;
        this.supplierCtrl = new FormControl();
        this.categoryCtrl = new FormControl();

        this.filteredSupplier = this.supplierCtrl.valueChanges
            .startWith(null)
            .map(supp => supp && (typeof supp === 'object') ? supp.CompanyName : supp)
            .map(supp => this.filterSuppliers(supp));

        this.filteredCategory = this.categoryCtrl.valueChanges
            .startWith(null)
            .map(cat => cat && (typeof cat === 'object') ? cat.CategoryName : cat)
            .map(cat => this.filterCategories(cat));

    }

    setModalInitializing() {
        this.modalInitializing = !this.detailProduct || !this.categories || !this.suppliers;

        if (!this.modalInitializing) {
            this.selectedSupplier = this.suppliers.find(s => s.SupplierID == this.detailProduct.SupplierID);
            this.selectedCategory = this.categories.find(s => s.CategoryID == this.detailProduct.CategoryID);
            this.modal.detailObject = Object.assign({}, this.detailProduct);
        }
    }

    ngOnInit() {
    }

    newProduct() {
        this.modalInitializing = true;
        this.detailProduct = new Product();
        this.detailProduct.ProductID = 0;
        this.detailProduct.ProductName = "";
        this.categories = null;
        this.suppliers = null;

        this.categoryService.getCategories().subscribe(cats => this.categories = cats, error => this.errorMessage = <any>error, () => this.setModalInitializing());
        this.supplierService.getSuppliers().subscribe(sups => this.suppliers = sups, error => this.errorMessage = <any>error, () => this.setModalInitializing());

        this.modal.detailObject = Object.assign({}, this.detailProduct);

        this.modal.open();
    }

    showDetails(id: number) {
        this.modalInitializing = true;
        this.detailProduct = null;
        this.categories = null;
        this.suppliers = null;

        this.prodService.getProductById(id).subscribe(prod => this.detailProduct = prod, error => this.errorMessage = <any>error, () => this.setModalInitializing());
        this.categoryService.getCategories().subscribe(cats => this.categories = cats, error => this.errorMessage = <any>error, () => this.setModalInitializing());
        this.supplierService.getSuppliers().subscribe(sups => this.suppliers = sups, error => this.errorMessage = <any>error, () => this.setModalInitializing());

        this.modal.detailObject = Object.assign({}, this.detailProduct);

        this.modal.open();
    }

    ngAfterViewInit() {
        this.QueryProducts();
    }

    setModalRef(modalRef: ModalComponent) {
        this.modal = modalRef;
    }

    onPagination(pageEvent: PageEvent) {
        this.showSpinner = true;
        let start = this.productsPagniator.pageIndex * this.productsPagniator.pageSize;
        this.productsInPage = this._products.slice(start, start + this.productsPagniator.pageSize);
        this.showSpinner = false;
    }

    pNameErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        // Error when invalid control is dirty, touched, or submitted
        const isSubmitted = form && form.submitted;
        return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    filterSuppliers(supp: string | Supplier) {
        return supp ? ((typeof supp === 'object') ? this.suppliers.filter(sup => sup.CompanyName.toLowerCase().indexOf(supp.CompanyName.toLowerCase()) === 0) : this.suppliers.filter(sup => sup.CompanyName.toLowerCase().indexOf(supp.toLowerCase()) === 0))
            : this.suppliers;
    }

    supplierName(supp: string| Supplier): string {
        return supp ? (typeof supp === 'object') ? supp.CompanyName : supp.toString() : "";
    }

    setSupplier(supp :  string | Supplier) {
        if (supp && (typeof supp === 'object')) {
            this.selectedSupplier = supp;
            this.modal.detailObject.SupplierID = this.selectedSupplier.SupplierID;
        }
    }

    filterCategories(cat : string | Category) {
        return cat ? ((typeof cat === 'object') ? this.categories.filter(c => c.CategoryName.toLowerCase().indexOf(cat.CategoryName.toLowerCase()) === 0) : this.categories.filter(c => c.CategoryName.toLowerCase().indexOf(cat.toLowerCase()) === 0))
            : this.categories;
    }

    categoryName(cat : string | Category): string {
        return cat ? (typeof cat === 'object') ? cat.CategoryName : cat.toString() : "";
    }

    setCategory(cat : string | Category) {
        if (cat && (typeof cat === 'object')) {
            this.selectedCategory = cat;
            this.modal.detailObject.CategoryID = this.selectedCategory.CategoryID;
        }
    }
    SaveChanges(event: Event) {
        if (this.detailProduct.ProductID == 0)
            this.prodService.AddProduct(this.modal.detailObject).subscribe({ error: (error) => console.log(error) })
        else
            this.prodService.UpdateProductById(this.detailProduct.ProductID, this.modal.detailObject).subscribe({ error: (error) => console.log(error)})
    }

}

export class SimpleDatabase {
				dataChange: BehaviorSubject<ProductListItem[]> = new BehaviorSubject<ProductListItem[]>([]);
				get data(): ProductListItem[] { return this.dataChange.value; }

				public setProductsData(prods: ProductListItem[]) {
								this.dataChange.next(prods);
				}

}

export class ProductDataSource extends DataSource<any> {

				constructor(private _db: SimpleDatabase, private _paginator: MdPaginator) {
				super()
				}

				/** Connect function called by the table to retrieve one stream containing the data to render. */
				connect(): Observable<ProductListItem[]> {
								const displayDataChanges = [
												this._db.dataChange,
												this._paginator.page,
								];

								return Observable.merge(...displayDataChanges).map(() => {
												const data = this._db.data.slice();

												// Grab the page's slice of data.
												const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
												return data.splice(startIndex, this._paginator.pageSize);
								});
				}
				

				disconnect() { }
}


