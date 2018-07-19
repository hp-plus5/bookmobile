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
  confirmation = ':(';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.book);
  }

  //   add(
  //     title: string,
  //     rating: number,
  //     read: boolean,
  //     ownership: boolean,
  //     female_protagonist: boolean,
  //     female_role_model: boolean,
  //     lgbtq_protagonist: boolean,
  //     lgbtq_sidekick: boolean,
  //     lgbtq_theme: boolean
  //   ): void {
  //     this.bookService
  //       .addBook({
  //         title,
  //         rating,
  //         read,
  //         ownership,
  //         female_protagonist,
  //         female_role_model,
  //         lgbtq_protagonist,
  //         lgbtq_sidekick,
  //         lgbtq_theme
  //       } as Book)
  //       .subscribe(book => {
  //         this.books.push(book);
  //       });
  //     this.confirmation = 'It got here';
  //   }

  testClick(event) {
    this.confirmation = 'Testing click successful';
  }

  addThisBook(): void {
    this.bookService.addBook(this.book).subscribe(() => this.route);
  }
}
