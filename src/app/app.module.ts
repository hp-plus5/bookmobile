import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';

import { FormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SelectedBookComponent } from './selected-book/selected-book.component';
import { UnselectedBookComponent } from './unselected-book/unselected-book.component';
import { AppRoutingModule } from './/app-routing.module';
import { MostRecentBookComponent } from './most-recent-book/most-recent-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    SelectedBookComponent,
    UnselectedBookComponent,
    MostRecentBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
