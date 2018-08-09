import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  @Input() book: Book;
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('new-book ngOnInit');
  }
  addThisBook(): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }
}
