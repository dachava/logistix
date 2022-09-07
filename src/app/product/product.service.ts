import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = 'http://localhost:8000/api/product';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  //Jalar todas los objetos
  getAll(): Observable<Product[]> {
    //Array de personas
    return this.httpClient
      .get<Product[]>(this.apiURL) //ruta
      .pipe(catchError(this.errorHandler)); //Captura de errores
  }

  //Person es una variable observable
  create(product: any): Observable<Product> {
    return this.httpClient //retorna esto tipo POST de objeto person
      .post<Product>(this.apiURL, JSON.stringify(product), this.httpOptions) //Ruta, atributos de persona, config. de header
      .pipe(catchError(this.errorHandler));
  }

  find(id: string): Observable<Product> {
    //trae un objeto
    return this.httpClient
      .get<Product>(this.apiURL + id) //con la ruta + el id para buscarlo
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, product: any): Observable<Product> {
    return this.httpClient
      .put<Product>(this.apiURL + id, JSON.stringify(product), this.httpOptions) //mismos datos del create mas el ID para actualizar
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.httpClient
      .delete<Product>(this.apiURL + id, this.httpOptions) //misma manera que antes, y el id para eliminar
      .pipe(catchError(this.errorHandler));
  }

  //manejo de errores
  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
