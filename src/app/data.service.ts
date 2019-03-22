import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Post } from './Post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "/userData"; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/api/users/';

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getData() {
    return this.httpClient.get<Post[]>(this.url);
  }

  getUser(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  addData(post: Post): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post<Post>(this.url, post, options);
  }

  updateUser(id: string, post: Post): Observable<any> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };

    return this.httpClient.put<Post>(this.url+id, post, options);
  }

  deleteUser(id: string, post: Post): Observable<any> {

    return this.httpClient.delete<Post>(this.url + id);
    

  }

}

