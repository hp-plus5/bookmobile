import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ChartsVerticalBarComponent
} from '@app/charts/charts-vertical-bar/charts-vertical-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'vertical-bar', pathMatch: 'full' },
  { path: 'vertical-bar', component: ChartsVerticalBarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
