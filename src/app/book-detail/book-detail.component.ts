import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Book } from '../book';
import { BookService } from '../book.service';
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
    private location: Location
  ) {}

  compareToBooksUrl = this.location.isCurrentPathEqualTo('/books');

  ngOnInit(): void {
    if (!this.book || this.book.isNew()) {
      // This seems to just go through no matter what. I don't understand the logic.
      this.getBookById();
      console.log(this.book + 'ngOnInit: id came through byId');
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

  updateThisBook(book): void {
    this.bookService.updateBook(this.book).subscribe();
  }

  addThisBook(book): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }
}
