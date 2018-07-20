import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location, NgStyle } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';
import { UnselectedBookComponent } from '../unselected-book/unselected-book.component';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book = new Book(); // saying this instead of just "@Input() book = Book;" ensures that the object will not be of the type undefined.
  // It's a security blanket specifically for when book-detail acts as a child (to books.component,
  // in this instance).
  books: Book[] = [];
  @Output() cancel = new EventEmitter<any>();
  // <any> is  a reference to the data we could potentially pass up to the parent component within the event emitter

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  urlCompareToBooks = this.location.isCurrentPathEqualTo('/books');

  ngOnInit(): void {
    if (!this.book || this.book.isNew) {
      this.getBook(); // this if statement and getBook() call is for when book-detail is used in most-recent.component, because
      // most-recent passes in the information/iteration/(which book it wants) via passing the info in the URL rather than through inheritance.
    }
    console.log(this.book); // this is helpful/used when book-detail gets its information/iteration from a parent.
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // the + is a JS operator that converts the string from paramMap (everything paramMap returns is a string) into a number.
    this.bookService.getBook(id).subscribe(book => (this.book = book));
  }

  onCancel(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    this.cancel.emit();
  }

  goBack(): void {
    this.location.back();
  }

  updateThisBook(): void {
    this.bookService.updateBook(this.book).subscribe();
  }

  addThisBook(): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }

  // save(
  //   title: string,
  //   rating: number,
  //   read: boolean,
  //   ownership: boolean,
  //   female_protagonist: boolean,
  //   female_role_model: boolean,
  //   lgbtq_protagonist: boolean,
  //   lgbtq_sidekick: boolean,
  //   lgbtq_theme: boolean
  // ): void {
  //   this.bookService.updateBook(this.book).subscribe(() => this.goBack());
  // }

  // add(title: string): void {
  //   this.bookService.addBook({ title } as Book).subscribe(book => {
  //     this.books.push(book);
  //   });
  // }
}
