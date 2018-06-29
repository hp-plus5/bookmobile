import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { BOOKS } from './mock-books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBooks(): Observable<Array<Book>> {
    // Array<Book> == Book[]
    return of(BOOKS);
  }
}
