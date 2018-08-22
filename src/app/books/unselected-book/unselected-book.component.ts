import { Component, Input, OnInit } from '@angular/core';

import { Book } from '@app/books/_models/book';

@Component({
  selector: 'app-unselected-book',
  templateUrl: './unselected-book.component.html',
  styleUrls: ['./unselected-book.component.css'],
})
export class UnselectedBookComponent implements OnInit {
  @Input()
  book = new Book();

  constructor() {}

  ngOnInit() {}
}
