import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BookDetailComponent } from '@app/book-detail/book-detail.component';
import { BooksComponent } from '@app/books/books-list/books.component';
import { CoreModule } from '@app/core/core.module';
import { MostRecentBookComponent } from '@app/most-recent-book/most-recent-book.component';
import { NewBookComponent } from '@app/new-book/new-book.component';
import { UnselectedBookComponent } from '@app/unselected-book/unselected-book.component';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,

    // BELOW CODE: was used when I was reading my mock info out of in-memory-data.service

    // HttpClientInMemoryWebApiModule,
    // // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // // and returns simulated server responses.
    // // Remove it when a real server is ready to receive requests. Then you'll end imports on "HttpClientModule".
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false
    // })
  ],
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    UnselectedBookComponent,
    MostRecentBookComponent,
    NewBookComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
