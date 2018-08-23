import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartsRoutingModule } from '@app/charts/charts-routing.module';
import {
    ChartsVerticalBarComponent
} from '@app/charts/charts-vertical-bar/charts-vertical-bar.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [SharedModule, ChartsRoutingModule, NgxChartsModule, CoreModule],
  declarations: [ChartsVerticalBarComponent],
})
export class ChartsModule {}
