import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from '@app/books/books-list/books.component';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { MostRecentBookComponent } from './most-recent-book/most-recent-book.component';
import { NewBookComponent } from './new-book/new-book.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'most-recent-entries', component: MostRecentBookComponent },
  { path: '', redirectTo: '/most-recent-entries', pathMatch: 'full' },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'new-book', component: NewBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
