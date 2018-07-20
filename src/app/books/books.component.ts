import { Component, OnInit } from '@angular/core';
import { Book, trackByBooks } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  selectedBook: Book;

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

  onCancel(): void {
    this.selectedBook = undefined;
  }
}
