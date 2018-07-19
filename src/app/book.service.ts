import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'api/books';

  constructor(private http: HttpClient) {}

  /** GET: receive books from the server */
  // http.get returns an array still (accessible by object.property) because of the web-api I'm using right now.
  // when i switch to hosting on Azure or wherever, i may need to use the map operator from Observable RxJS.
  // there's an example in the getBookNo404() method.

  // return of(BOOKS); <-- this line is for when you just have mocked data in a .ts file somewhere instead of
  // accessing it via HttpClient. You'd import it as { BOOKS } from 'app/mock-data.ts'

  // line 24's "Array<Book>" is the same as saying "Book[]"
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(books => this.log(`fetched books`)),
      catchError(this.handleError('getBooks', []))
    );
  }

  /** GET book by id. Return `undefined` when id not found */
  getBookNo404<Data>(id: number): Observable<Book> {
    const url = `${this.booksUrl}/?id=${id}`;
    return this.http.get<Book[]>(url).pipe(
      map(books => books[0]), // returns a {0|1} element array
      // tap(h => {
      // const outcome = h ? `fetched` : `did not find`;
      // this.log(`${outcome} book id=${id}`); <-- for if I implemented MessageService from tutorial.
      // }),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /* GET books whose name contains search term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if not search term, return empty book array.
      return of([]);
    }
    return this.http.get<Book[]>(`${this.booksUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found books matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }

  ////// SAVE DATA //////

  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable (( couldn't figure out how this was supposed to help. potential double init? ))
      tap((book: Book) => this.log(`added book w/ id=${book.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  /** PUT: update the book on the server */
  // book.id is how the current web api knows which book to access. may need to write some SQL later for this same concept when
  // data services switch over.
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    console.log('BookService: ' + message);
    // this is code Beth is writing to supplant a messageService method she doesn't want to use
  }
}
