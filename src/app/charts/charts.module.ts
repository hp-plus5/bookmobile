import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartsLandingComponent } from '@app/charts/charts-landing/charts-landing.component';
import { ChartsRoutingModule } from '@app/charts/charts-routing.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [SharedModule, ChartsRoutingModule, NgxChartsModule, CoreModule],
  declarations: [ChartsLandingComponent],
})
export class ChartsModule {}
