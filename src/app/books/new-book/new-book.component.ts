import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Book } from '@app/books/_models/book';
import { BookService } from '@app/books/_services/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  @Input()
  book = new Book();
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // tslint:disable-next-line:no-console
    console.log('new-book ngOnInit');
  }
  addThisBook(): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }
}
