import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsLandingComponent } from '@app/charts/charts-landing/charts-landing.component';
import {
    CustomChartsViewComponent
} from '@app/charts/custom-charts-view/custom-charts-view.component';

const routes: Routes = [
  { path: '', component: ChartsLandingComponent },
  { path: 'custom-chart', component: CustomChartsViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
