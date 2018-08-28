import { Component, Input, OnInit } from '@angular/core';

import { ChartRequest, ChartType } from '@app/charts/_models/chart-request';
import { ChartResponse } from '@app/charts/_models/chart-response';
import { ChartService } from '@app/charts/chart.service';
import { single } from '@app/charts/charts-response.fixture.spec';
import { ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-custom-charts-view',
  templateUrl: './custom-charts-view.component.html',
  styleUrls: ['./custom-charts-view.component.css'],
})
export class CustomChartsViewComponent implements OnInit {
  @Input()
  chartResponse = new ChartResponse();
  chosenChartType!: ChartType;
  single: any[] = [];
  multi: any[] = [];

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
  constructor(
    private modalService: ModalService,
    private chartService: ChartService,
  ) {
    Object.assign(this, { single });
  }
  ngOnInit(): void {
    this.getChartResponse();
  }

  getChartResponse(): void {
    this.chosenChartType = this.chartService.currentRequest.chartType;
    this.chartService
      .getChartData()
      .subscribe(newResponse => (this.chartResponse = newResponse));
  }
}
