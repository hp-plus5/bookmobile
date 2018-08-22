import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailComponent } from '@app/books/book-detail/book-detail.component';
import { BooksComponent } from '@app/books/books-list/books.component';
import { MostRecentBookComponent } from '@app/books/most-recent-book/most-recent-book.component';
import { NewBookComponent } from '@app/books/new-book/new-book.component';

const routes: Routes = [
  { path: 'library', component: BooksComponent },
  { path: 'most-recent-entries', component: MostRecentBookComponent },
  { path: '', redirectTo: 'most-recent-entries', pathMatch: 'full' },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'new-book', component: NewBookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
