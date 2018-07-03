import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SelectedBookComponent } from './selected-book/selected-book.component';
import { UnselectedBookComponent } from './unselected-book/unselected-book.component';
import { MostRecentBookComponent } from './most-recent-book/most-recent-book.component';
import { NewBookComponent } from './new-book/new-book.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    SelectedBookComponent,
    UnselectedBookComponent,
    MostRecentBookComponent,
    NewBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests. Then you'll end imports on "HttpClientModule".
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
