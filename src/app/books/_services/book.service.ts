// tslint:disable:no-console
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Book } from '@app/books/_models/book';

// A good way to view @Injectable decorators in services is to think of it as @CanBeInjectedThings. It's referring to the fact that any component within 'root' can inject something into this service. (You need it in order to make dependency injection work in Angular.)
@Injectable({
  providedIn: 'root',
})
export class BookService {
  // httpHeaders, given "old" httpClient syntax. All included/referenced automatically because of, I suspect, the constructor
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'authkey',
      userid: '1',
    }),
    params: new HttpParams({
      fromString: 'value',
    }),
  };

  // booksApiUrl was previous booksUrl and linked to "api/books", which allowed me to read mock data out of in-memory-data.service
  private _booksApiUrl = `${environment.apiUrl}/books`;
  booksApiUrl = this._booksApiUrl;
  getBooksApiUrl() {
    return this.booksApiUrl;
  }

  // private _bookCoversApiUrl = `${environment.apiUrl}/bookcovers`;
  // bookCoversApiUrl = this._bookCoversApiUrl;
  // getBooksApiUrl() {
  //   return this.booksApiUrl;
  // }

  constructor(private http: HttpClient) {}

  /** GET: receive books from the server */
  // http.get returns an array still (accessible by object.property) because of the web-api I'm using right now.
  // when i switch to hosting on Azure or wherever, i may need to use the map operator from Observable RxJS.
  // there's an example in the getBookNo404() method.

  // return of(BOOKS); <-- this line is for when you just have mocked data in a .ts file somewhere instead of
  // accessing it via HttpClient. You'd import it as { BOOKS } from 'app/mock-data.ts'

  // "Array<Book>" is the same as saying "Book[]"
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksApiUrl, this.httpOptions).pipe(
      tap(books => this.log(`fetched books`)),
      // [ map(books) ] says "when in the future we see an event that happens to be an array of books being given to us, we're gonna do something with it".
      // to get all of the json books (not necessarily interpreted as objects; methods are not parseable, see two lines below) and
      // [ => ] with the fat arrow goes ahead and
      // [ books.map(book) => ] maps (key, object) all of those json objects (from the API) into objects that have behavior (methods)
      // *(( key = json book, value = new object Book. ))
      // [ new Book(book) ] we went into our book class and gave it a constructor to take in a parameter of a bookObject
      // to ensure that our json objects and our objects being changed in the duration of the app will be compatible.
      // the overall goal here is to create another separate instance of a book so that we're not immediately
      // reiterating over our old data copy of that book (the json). This means that our submit and cancel buttons on book-details
      // will no longer be meaningless/ they'll actually be what saves or doesn't save our changed data.

      // metaphor: sheets of paper with marks wrapped up in other sheets of paper (json) vs. books (objects you want to create and work with)
      map(books => books.map(book => new Book(book))),
      catchError(this.handleError('getBooks', [])),
    );
  }

  // getBookNo404<Data>(id: number): Observable<Book> {
  //   const url = `${this.booksApiUrl}/${id}`;
  //   return this.http.get<Book[]>(url, this.httpOptions).pipe(
  //     map(books => books[0]), // returns a {0|1} element array
  //     // tap(h => {
  //     // const outcome = h ? `fetched` : `did not find`;
  //     // this.log(`${outcome} book id=${id}`); <-- for if I implemented MessageService from tutorial.
  //     // }),
  //     catchError(this.handleError<Book>(`Book with id of ${id} not found,`)),
  //   );
  // }

  /** GET book by id. Will 404 if id not found */
  getBookById(id: number): Observable<Book> {
    const url = `${this.booksApiUrl}/${id}`;
    return this.http.get<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBookById id=${id} does not exist`)),
    );
  }

  /* GET books whose name contains search term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if not search term, return empty book array.
      return of([]);
    }
    return this.http.get<Book[]>(`${this.booksApiUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found books matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBooks', [])),
    );
  }

  ////// SAVE DATA //////

  /** POST: add a new book to the database */
  // addBook(book: Book): Observable<Book> {
  //   const id = typeof book === 'number' ? book : book.id;
  //   const url = `${this.booksApiUrl}/${id}`;
  //   return this.http.post<Book>(url, book, this.httpOptions).pipe(
  //     // tslint:disable-next-line:no-shadowed-variable (( couldn't figure out how this was supposed to help. potential double init? ))
  //     tap((book: Book) => this.log(`added book w/ id=${book.id}`)),
  //     catchError(this.handleError<Book>('addBook')),
  //   );
  // }

  addBook(book: Book): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksApiUrl}/${id}`;
    // return of([]); <-- this was code I was using for while I had only a mock API via in-memory-data-service.
    // isNew;
    return this.http.post(url, book, this.httpOptions).pipe(
      tap(_ => this.log(`added book id=${id}`)),
      catchError(this.handleError<any>('addBook has failed')),
    );
  }

  /**
   * DELETE: delete the book from the database
   * @param book - the book to be deleted | @param bookId - the id of the book to be deleted
   */
  deleteBook(book: Book | number): Observable<any> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksApiUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook')),
    );
  }

  /**
   * PUT: update the book on the database
   * @param book - the entire book object to be updated
   */
  updateBook(book: Book): Observable<any> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksApiUrl}/${id}`;
    // return of([]); <-- this was code I was using for while I had only a mock API via in-memory-data-service.
    // isNew;
    return this.http.put(url, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated book id=${id}`)),
      catchError(this.handleError<any>('updateBook')),
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
      console.error(error + operation); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    console.log('BookService: ' + message);
  }
}
