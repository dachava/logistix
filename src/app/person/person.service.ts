import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiURL = 'http://localhost:8000/api/person/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  //Jalar todas las personas
  getAll(): Observable<Person[]> {
    //Array de personas
    return this.httpClient
      .get<Person[]>(this.apiURL) //ruta
      .pipe(catchError(this.errorHandler)); //Captura de errores
  }

  //Person es una variable observable
  create(person: any): Observable<Person> {
    return this.httpClient //retorna esto tipo POST de objeto person
      .post<Person>(this.apiURL, JSON.stringify(person), this.httpOptions) //Ruta, atributos de persona, config. de header
      .pipe(catchError(this.errorHandler));
  }

  find(id: string): Observable<Person> {
    //trae un objeto
    return this.httpClient
      .get<Person>(this.apiURL + id) //con la ruta + el id para buscarlo
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, person: any): Observable<Person> {
    return this.httpClient
      .put<Person>(this.apiURL + id, JSON.stringify(person), this.httpOptions) //mismos datos del create mas el ID para actualizar
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.httpClient
      .delete<Person>(this.apiURL + id, this.httpOptions) //misma manera que antes, y el id para eliminar
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
