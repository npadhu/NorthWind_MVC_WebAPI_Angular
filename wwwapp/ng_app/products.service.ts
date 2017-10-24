import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions, Http } from "@angular/http";

import { Observable } from "rxjs/observable";
import { Product } from "./product"
import { ProductListItem } from "./productlistitem"

@Injectable()
export class ProductsService {
    private allproductsUrl: string = "api/Products";
    private productByIdUrl: string = "api/Products/";
    private addProductUrl: string = "api/Products/";

    constructor(private http : Http) {}

    extractData(response: Response) {
        console.log(response.json());
        return response.json();
    }

    handlError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    getProducts(): Observable<ProductListItem[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.allproductsUrl, options)
            .map(this.extractData)
            .catch(this.handlError);
    }

    getProductById(id: number): Observable<Product> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.productByIdUrl + "/" + id.toString(), options)
            .map(this.extractData)
            .catch(this.handlError);
    }

    UpdateProductById(id: number, product: Product) : Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(product);

        return this.http.put(this.productByIdUrl + "/" + id.toString(), body, options)
            .catch(this.handlError);
    }

    AddProduct(prod: Product): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(prod);

        return this.http.post(this.addProductUrl, body, options)
            .catch(this.handlError);
    }

}
    