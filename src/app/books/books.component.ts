import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  selectedBook: Book;

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

  // function showBook(bookObj) {
  //   var result = '';
  //   for (var i in bookObj) {
  //     if (bookObj.hasOwnProperty(i)) {
  //       result += bookObj + '.' + i + ' = ' + bookObj[i] + '/n';
  //     }
  //   }
  //   return result;
  // }

  // if (book.property === true) {
  //   console.log("Yes");
  // } else {
  //   console.log("No");
  // }
}
