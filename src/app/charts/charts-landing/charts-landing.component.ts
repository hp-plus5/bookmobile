import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartDataChoice, ChartRequest, ChartType } from '@app/charts/_models/chart-request';
import { ChartService } from '@app/charts/chart.service';
import { multi, single, singleAsMulti } from '@app/charts/charts-response.fixture.spec';
import { IModalOptions, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-charts-landing',
  templateUrl: './charts-landing-card-attempt.component.html',
  styleUrls: ['./charts-landing.component.css'],
})
export class ChartsLandingComponent implements OnInit {
  @Input()
  chartRequest = new ChartRequest();
  // saying this instead of just "@Input() chart = Chart" ensures that the object will not be of the type undefined.
  // It's a security blanket specifically for when the component acts as a child.
  chosenChartType!: ChartType;

  single: any[] = [];
  singleAsMulti: any[] = [];
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
    Object.assign(this, { single, singleAsMulti, multi });
  }
  private modalOptions: IModalOptions = {
    // this is for my modal. implements the interface (thanks, typescript!)
    title: 'Hello, and welcome to Dataville!',
    body:
      // tslint:disable-next-line:quotemark because of the apostrophe in 'you've'
      "To use the charts feature, you can select one item from each category below to create a chart about the books that you've read.",
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

  toggleDataChoice(chartDataChoice: ChartDataChoice[]) {
    // if click > once won't work; they should be able to revise their decisions, and i'm not sure how closely tied i want to make this with my DOM.
    // i may need to have a form of some variety? or an explicit input? so that i can make it into a multiple choice and not...this. but i feel there must be some way for me to open this up programmatically.
    this.chartRequest.chartDataChoice = chartDataChoice;
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
