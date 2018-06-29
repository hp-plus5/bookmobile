import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-unselected-book',
  templateUrl: './unselected-book.component.html',
  styleUrls: ['./unselected-book.component.css']
})
export class UnselectedBookComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
