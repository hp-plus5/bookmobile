import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartRequest, ChartType, DataChoice } from '@app/charts/_models/chart-request';
import { ChartService } from '@app/charts/chart.service';
import { multi, single } from '@app/charts/charts-response.fixture.spec';
import { IModalOptions, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-charts-landing',
  templateUrl: './charts-landing.component.html',
  styleUrls: ['./charts-landing.component.css'],
})
export class ChartsLandingComponent implements OnInit {
  @Input()
  chartRequest = new ChartRequest();
  // saying this instead of just "@Input() chart = Chart" ensures that the object will not be of the type undefined.
  // It's a security blanket specifically for when the component acts as a child.
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
    private router: Router,
  ) {
    Object.assign(this, { single });
  }
  private modalOptions: IModalOptions = {
    // this is for my modal. implements the interface (thanks, typescript!)
    title: 'Hello, and welcome to Dataville!',
    body:
      // tslint:disable-next-line:quotemark
      "Please select one item from each category below to create a chart about the books that you've read.",
    submit: 'Okie doke!',
    cancel: 'Close',
  };

  ngOnInit(): void {
    // if (user.isNew) {
    // this.openModal();
    // }
  }
  selectChartType(chartType: ChartType) {
    this.chartRequest.chartType = chartType;
  }

  selectDataChoice(dataChoice: DataChoice) {
    this.chartRequest.dataChoice = dataChoice;
  }

  onSubmit(): void {
    this.chartService.currentRequest = this.chartRequest;
    this.router.navigate(['data/custom-chart']);
    // this dumps this instance of currentRequest into the service, which will then be fetched by a method in custom-charts ('getResponse' or something) that then forms that object into a chartResponse. That response will be made up of JSON data for ngx-charts to read.
  }

  openModal(): void {
    this.modalService.openModal(this.modalOptions);
    this.modalService.close.subscribe(modalResult => {
      return;
    });
  }
}
