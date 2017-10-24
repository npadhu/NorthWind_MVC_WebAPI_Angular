import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdFormFieldModule,
				MdOptionModule,
				MdTableModule,
    MdPaginatorModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const $ = require('jquery');

import { ProductsService } from "./products.service";
import { AppComponent } from "./app.component";
import { ProductListComponent } from './productlist.component';
import { ModalComponent } from "./modal.component";
import { CategoryService } from "./category.service"
import { SupplierService } from "./supplier.service"

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        MdPaginatorModule,
        CdkTableModule,
        MdAutocompleteModule,
        MdFormFieldModule,
								MdOptionModule,
								MdTableModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ProductListComponent,
        ModalComponent
    ],
    providers: [ProductsService, CategoryService, SupplierService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
