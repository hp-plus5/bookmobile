import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'books', loadChildren: '@app/books/books.module#BooksModule' },
  { path: 'data', loadChildren: '@app/charts/charts.module#ChartsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
