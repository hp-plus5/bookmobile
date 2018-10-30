import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ChartDataChoice, ChartType } from '@app/charts/_models/chart-request';
import { ChartResponse } from '@app/charts/_models/chart-response';
import { ChartService } from '@app/charts/chart.service';
import { multi } from '@app/charts/charts-response.fixture.spec';
import { ModalService } from '@app/core/modal/modal.service';

import { titleCase } from 'change-case';

@Component({
  selector: 'app-custom-charts-view',
  templateUrl: './custom-charts-view.component.html',
  styleUrls: ['./custom-charts-view.component.css'],
})
export class CustomChartsViewComponent implements OnInit {
  @Input()
  chartResponse = new ChartResponse();
  chosenChartType!: ChartType;
  // single: any[] = [];
  multi: any[] = [];
  chosenDataChoice!: ChartDataChoice[];
  dataTitle!: string;

  view: any[] = [450, 450];
  viewAdvancedPieChart: any[] = [800, 800];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel!: string;
  showYAxisLabel = true;
  yAxisLabel = 'Number of Books';
  showDataLabel = true;
  colorScheme = 'cool';
  constructor(
    private modalService: ModalService,
    private chartService: ChartService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getChartResponse();
  }

  getChartResponse(): void {
    this.chosenChartType = this.chartService.currentRequest.chartType;
    this.chosenDataChoice = this.chartService.currentRequest.chartDataChoice;
    this.xAxisLabel = titleCase(this.chosenDataChoice.toString());
    this.dataTitle = titleCase(this.chosenDataChoice.toString());

    this.chartService
      .getChartData()
      .subscribe(newResponse => (this.chartResponse = newResponse));
  }
  goBack(): void {
    this.location.back();
  }
}
