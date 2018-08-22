import { Component, NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { multi, single } from '@app/charts/charts-vertical-bar/charts-vertical-bar.fixture.spec';

@Component({
  selector: 'app-charts-vertical-bar',
  templateUrl: './charts-vertical-bar.component.html',
  styleUrls: ['./charts-vertical-bar.component.css'],
})
export class ChartsVerticalBarComponent {
  single: any[] = [];
  multi: any[] = [];

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Genre';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Books';
  showDataLabel = true;

  colorScheme = 'cool';

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    // tslint:disable-next-line:no-console
    console.log(event);
  }
}
