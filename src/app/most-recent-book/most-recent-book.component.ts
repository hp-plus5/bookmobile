import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-most-recent-book',
  templateUrl: './most-recent-book.component.html',
  styleUrls: ['./most-recent-book.component.css']
})
export class MostRecentBookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService
      .getBooks()
      .subscribe(books => (this.books = books.slice(1, 5)));
  }
}
