import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  { path: 'books', loadChildren: () => import('@app/books/books.module').then(m => m.BooksModule) },
  { path: 'data', loadChildren: () => import('@app/charts/charts.module').then(m => m.ChartsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
