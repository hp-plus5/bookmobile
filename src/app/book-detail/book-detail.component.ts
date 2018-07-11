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
    this.getBook();
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
