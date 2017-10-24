import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions, Http } from "@angular/http";

import { Observable } from "rxjs/observable";
import { Category } from "./category"

@Injectable()
export class CategoryService {
    private getCategoriesURL: string = "api/Categories";
    private getCategoryByIdURL: string = "api/Categories";

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


    getCategories(): Observable<Category[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getCategoriesURL, options)
            .map(this.extractData)
            .catch(this.handlError);
    }

    getCategoryById(id: number): Observable<Category> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getCategoriesURL + "/" + id.toString(), options)
            .map(this.extractData)
            .catch(this.handlError);
    }
}