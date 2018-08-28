import { Component, OnInit } from '@angular/core';

import { Book, trackByBooks } from '@app/books/_models/book';
import { BookService } from '@app/books/_services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | undefined;
  trackByBooks = trackByBooks;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => (this.books = books));
  }

  deSelectBook(): void {
    this.selectedBook = undefined;
    this.getBooks(); // this method is used only when done with an httpPut (or a cancel), so calling getBooks() effectively refreshes our data to see our updated book.
  }
}
