import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsLandingComponent } from '@app/charts/charts-landing/charts-landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'vertical-bar', pathMatch: 'full' },
  { path: 'vertical-bar', component: ChartsLandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
