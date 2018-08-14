import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../_services/book.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail-template-driven.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book = new Book(); // saying this instead of just "@Input() book = Book;" ensures that the object will not be of the type undefined.
  // It's a security blanket specifically for when book-detail acts as a child (to books.component, in this instance).
  books: Book[] = [];
  @Output() cancel = new EventEmitter<any>();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}
  compareToBooksUrl = this.location.isCurrentPathEqualTo('/books');
  compareToNewBookUrl = this.location.isCurrentPathEqualTo('/new-book');

  ngOnInit(): void {
    if (
      !this.book ||
      (this.book.isNew() && this.compareToNewBookUrl === false)
    ) {
      // I don't understand the logic of this if statement.
      this.getBookById();
      console.log(this.book + 'ngOnInit: id came through byId');
    } else if (
      !this.book ||
      (this.book.isNew() && this.compareToNewBookUrl === true)
    ) {
      console.log('book-detail ngOnInit: new book');
    } else {
      this.getBookByIdThroughParent(this.book.id);
      console.log(
        this.book + 'ngOnInit: id came through parent component (books)'
      );
    }
  }

  getBookById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // the + is a JS operator that converts the string from paramMap (everything paramMap returns is a string) into a number.
    this.bookService.getBookById(id).subscribe(book => (this.book = book));
  }

  getBookByIdThroughParent(id: number): void {
    this.bookService
      .getBookById(this.book.id)
      .subscribe(book => (this.book = book));
  }

  deSelectBook(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    this.cancel.emit();
    // the stopPropogation command surfaces up to the immediate upper layer from where the event is triggered on the template,
    // which is the ngForm. It tells the form to ignore the event. After that, .emit() is a direct line of communication to the
    // parent component - in this case, books - which contains a method also called deSelectBook() that tells our event in
    // book-detail.component.html to qualify the <app-books-detail> marked in books.component.html as "undefined", or in
    // other words, #unselectedBook (see books.component.html's *ngIf - ng-template).
  }

  goBack(): void {
    this.location.back();
  }

  updateThisBook(book: Book): void {
    // if we passed in form: Form here instead of book, we could alter the state of the form
    if (this.compareToNewBookUrl === true) {
      this.addThisBook(book);
    } else {
      this.bookService.updateBook(this.book).subscribe(
        () => this.cancel.emit(), // this line is doing deSelectBook's job so that we avoid a (click) method on our submit button on the template, but we couldn't just put a this.cancel.emit() on a line after subscribing to our updateBook method, because it would cancel our subscription before we'd necessarily gotten back a response. So this way, our code is forced to wait to get a response from the server before it moves on to cancel the event emission (which we want to return book-detail to an uneditable UI)
        error => {
          console.error(error); // this is where a message service would go to trigger (say) a modal notice to the user
        }
      );
    }
  }
  addThisBook(book): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }

  deleteThisBook(book: Book): void {
    if (this.compareToNewBookUrl === true) {
      // insert modal message stating that you cannot delete a book that doesn't exist yet
    } else {
      this.bookService.deleteBook(this.book).subscribe(
        () => this.cancel.emit(), // this line is doing deSelectBook's job so that we avoid a (click) method on our submit button on the template, but we couldn't just put a this.cancel.emit() on a line after subscribing to our updateBook method, because it would cancel our subscription before we'd necessarily gotten back a response. So this way, our code is forced to wait to get a response from the server before it moves on to cancel the event emission (which we want to return book-detail to an uneditable UI)
        error => {
          console.error(error); // this is where a message service would go to trigger (say) a modal notice to the user in case of failure
        }
      );
    }
  }
}
