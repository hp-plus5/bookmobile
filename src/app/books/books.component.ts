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

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero).subscribe();
  // }

  // function showBook(bookObj) {
  //   var result = '';
  //   for (var i in bookObj) {
  //     if (bookObj.hasOwnProperty(i)) {
  //       result += bookObj + '.' + i + ' = ' + bookObj[i] + '/n';
  //     }
  //   }
  //   return result;
  // }
}
