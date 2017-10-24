import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions, Http } from "@angular/http";

import { Observable } from "rxjs/observable";
import { Supplier } from "./supplier"

@Injectable()
export class SupplierService {
    private getSuppliersURL: string = "api/Suppliers";
    private getSupplierByIdURL: string = "api/Suppliers";

    constructor(private http: Http) { }

    extractData(response: Response) {
        console.log(response.json());
        return response.json();
    }

    handlError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    getSuppliers(): Observable<Supplier[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getSuppliersURL, options)
            .map(this.extractData)
            .catch(this.handlError);
    }

    getSupplierById(id: number): Observable<Supplier> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getSupplierByIdURL + "/" + id.toString(), options)
            .map(this.extractData)
            .catch(this.handlError);
    }
}