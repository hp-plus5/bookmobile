import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  @Input() book: Book;
  books: Book[] = [];
  confirmation = ':(';

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  add(
    title: string,
    rating: number,
    read: boolean,
    ownership: boolean,
    female_protagonist: boolean,
    female_role_model: boolean,
    lgbtq_protagonist: boolean,
    lgbtq_sidekick: boolean,
    lgbtq_theme: boolean
  ): void {
    this.confirmation = 'It got here';

    this.bookService
      .addBook({
        title,
        rating,
        read,
        ownership,
        female_protagonist,
        female_role_model,
        lgbtq_protagonist,
        lgbtq_sidekick,
        lgbtq_theme
      } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

  testClick(event) {
    this.confirmation = 'Testing click successful';
  }
}
