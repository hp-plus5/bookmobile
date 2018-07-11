import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  @Input() book: Book;
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.bookService.addBook({ title } as Book).subscribe(book => {
      this.books.push(book);
    });
  }
}
