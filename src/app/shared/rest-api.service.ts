import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { catchError,retry } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // get-------------------------------
  getProducts(): Observable<Product> {
    return this.http.get<Product>(this.apiURL + '/products')
      .pipe(retry(1), catchError(this.handleError));
  }

// get by id----------------------------
getProduct(id: any): Observable<Product> {
  return this.http.get<Product>(this.apiURL + '/products/' + id)
    .pipe(retry(1), catchError(this.handleError));
}


// Post to create----------------------
createProduct(product: any): Observable<Product> {
  return this.http
  .post<Product>(
    this.apiURL + '/products',
    JSON.stringify(product),
    this.httpOptions
  )
  .pipe(retry(1), catchError(this.handleError));
}

  // delete------------------------------
  deleteProduct(id: any) {
    return this.http
      .delete<Product>(this.apiURL + '/products/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  
  // update---------------------------------
  updateProduct(id: any, product: any): Observable<Product> {
    return this.http
      .put<Product>(
        this.apiURL + '/products/' + id, JSON.stringify(product), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
