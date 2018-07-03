import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
// Currently a newBook() method, empty, on app.component.ts. Dunno if it should be there or here
}
