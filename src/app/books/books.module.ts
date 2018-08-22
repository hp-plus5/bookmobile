import { NgModule } from '@angular/core';

import { BookDetailComponent } from '@app/books/book-detail/book-detail.component';
import { BooksComponent } from '@app/books/books-list/books.component';
import { BooksRoutingModule } from '@app/books/books-routing.module';
import { MostRecentBookComponent } from '@app/books/most-recent-book/most-recent-book.component';
import { NewBookComponent } from '@app/books/new-book/new-book.component';
import { UnselectedBookComponent } from '@app/books/unselected-book/unselected-book.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [SharedModule, BooksRoutingModule],
  declarations: [
    BooksComponent,
    BookDetailComponent,
    UnselectedBookComponent,
    MostRecentBookComponent,
    NewBookComponent,
  ],
})
export class BooksModule {}
