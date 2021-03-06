// tslint:disable:no-console
import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '@app/books/_models/book';
import { BookService } from '@app/books/_services/book.service';
import { IModalOptions, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail-template-driven.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input()
  book = new Book(); // saying this instead of just "@Input() book = Book;" ensures that the object will not be of the type undefined.
  // It's a security blanket specifically for when book-detail acts as a child (to books.component, in this instance).
  books: Book[] = [];

  @Output()
  cancel = new EventEmitter<any>();
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
  ) {}
  compareToNewBookUrl = this.location.isCurrentPathEqualTo('/books/new-book');
  compareToBooksUrl = this.location.isCurrentPathEqualTo('/books/library');

  private modalOptions: IModalOptions = {
    // this is for my modal. implements the interface (thanks, typescript!)
    title: 'Delete',
    body: 'Are you sure about this?',
    submit: 'Yup',
    cancel: 'No, god, please, no!!',
  };

  ngOnInit(): void {
    // commented out code in this function is written for debugging purposes so that it can be easily retrieved.
    if (
      !this.book ||
      (this.book.isNew() === true && this.compareToNewBookUrl === false)
    ) {
      this.getBookById();
      // console.log(this.book + 'ngOnInit: id came through byId');
    } else if (
      !this.book ||
      (this.book.isNew() === true && this.compareToNewBookUrl === true)
    ) {
      // March Sam!! this is where I'm trying to correct a routing error where it's attempting to find url/null when going to a new page (since a new book has an unacceptable ID of 0). Be careful not to go too far out of scope. Remember you're on the master branch and this is a bunny trail. If you go too far, it's better that you hadn't gone at all and just ignored your single console error. Go back to testing with spectator.
      // console.log('book-detail ngOnInit: new book');
    } else {
      this.getBookByIdThroughParent(this.book.id);
      // console.log(
      // this.book + 'ngOnInit: id came through parent component (books)',
      // );
    }
  }

  getBookById(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId === null) {
      return;
    }
    const id = +routeId;
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
    /* the stopPropogation command surfaces up to the immediate upper layer from wheremst the event is triggered on the template, which is the ngForm. It tells the form to ignore the event. After that, .emit() is a direct line of communication to the parent component - in this case, books - which contains a method also called deSelectBook() that tells our event in book-detail.component.html to qualify the <app-books-detail> marked in books.component.html as "undefined", or in other words, #unselectedBook (see books.component.html's *ngIf - ng-template).
    */
  }

  goBack(): void {
    this.location.back();
  }

  updateOrAddThisBook(): void {
    // if we passed in form: Form here instead of book, we could alter the state of the form
    if (this.compareToNewBookUrl === true) {
      this.addThisBook();
    } else {
      this.bookService.updateBook(this.book).subscribe(
        () => this.cancel.emit(), // this line is doing deSelectBook's job so that we avoid a (click) method on our submit button on the template, but we couldn't just put a this.cancel.emit() on a line after subscribing to our updateBook method, because it would cancel our subscription before we'd necessarily gotten back a response. So this way, our code is forced to wait to get a response from the server before it moves on to cancel the event emission (which we want to return book-detail to an uneditable UI)
        error => {
          console.error(error); // this is where a message service would go to trigger (say) a modal notice to the user
        },
      );
    }
  }
  addThisBook(): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }

  deleteThisBook(): void {
    if (this.compareToNewBookUrl === true) {
      // insert alert message stating that you cannot delete a book that doesn't exist yet
    } else {
      this.bookService.deleteBook(this.book).subscribe(
        () => this.cancel.emit(), // this line is doing deSelectBook's job so that we avoid a (click) method on our submit button on the template, but we couldn't just put a this.cancel.emit() on a line after subscribing to our updateBook method, because it would cancel our subscription before we'd necessarily gotten back a response. So this way, our code is forced to wait to get a response from the server before it moves on to cancel the event emission (which we want to return book-detail to an uneditable UI)
        error => {
          console.error(error); // this is where a message service would go to trigger an alert to the user in case of failure
        },
      );
    }
  }

  openModal(): void {
    this.modalService.openModal(this.modalOptions);
    // then, once the modal is open, we listen to see which button is clicked. We're passed the modalResult from the modal template, which we then pass to the service's "close" property:
    this.modalService.close.subscribe(modalResult => {
      if (modalResult === 'cancel') {
        return;
      }
      this.deleteThisBook();
    });
  }
}
