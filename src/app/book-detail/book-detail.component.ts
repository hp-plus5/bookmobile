import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log(this.book);
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // the + is a JS operator that converts the string from paramMap (everything paramMap returns is a string) into a number.
    this.bookService.getBook(id).subscribe(book => (this.book = book));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookService.updateBook(this.book).subscribe(() => this.goBack());
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

  add(title: string): void {
    this.bookService.addBook({ title } as Book).subscribe(book => {
      this.books.push(book);
    });
  }
}
