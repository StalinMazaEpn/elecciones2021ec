import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
// import "url-search-params-polyfill";
import { catchError, mergeMap, retryWhen, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EleccionesService {
  public urlSegunda: string;
  public url: string;

  constructor(protected http: HttpClient) {
    this.url = "https://stalinmazadev-default-rtdb.firebaseio.com/elecciones2021ec.json";
    this.urlSegunda = "https://stalinmazadev-default-rtdb.firebaseio.com/elecciones2021ec_segundavuelta.json";
    // this.urlSegunda = "https://resultados2021.cne.gob.ec/Home/ConsultarResultados";
  }

  getDataApiCNE() {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let body = new URLSearchParams();
    body.set("request[intCodDignidad]", "1");
    body.set("request[intCodProvincia]", "-1");
    body.set("request[intCodCanton]", "-1");
    body.set("request[intCodCircunscripcion]", "-1");
    const bodyForm = body.toString();

    const bodyJson = {
      "request[intCodDignidad]": 1,
      "request[intCodProvincia]": -1,
      "request[intCodCanton]": -1,
      "request[intCodCircunscripcion]": -1
    };

    return this.http.post(this.url, bodyForm, { headers }).pipe(catchError(()=>{
      return of({data: []})
    }));
  }

  getDataApi() {
    return this.http.get(this.url).pipe(catchError(()=>{
      return of({data: []})
    }));
  }
  getDataApiSegunda() {
    return this.http.get(this.urlSegunda).pipe(catchError(()=>{
      return of({data: []})
    }));
  }
}
