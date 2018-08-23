import { Component, OnInit } from '@angular/core';

import { multi, single } from '@app/charts/charts-landing/charts-landing.fixture.spec';
import { ChartsModule } from '@app/charts/charts.module';
import { IModalOptions, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-charts-landing',
  templateUrl: './charts-landing-form-attempt.component.html',
  styleUrls: ['./charts-landing.component.css'],
})
export class ChartsLandingComponent implements OnInit {
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
  chosenChartType: ChartType = 'verticalBarChart';
  constructor(private modalService: ModalService) {
    Object.assign(this, { single });
  }
  private modalOptions: IModalOptions = {
    // this is for my modal. implements the interface (thanks, typescript!)
    title: 'Hello, and welcome to data!',
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
  onSelectBar(event: any) {
    this.chosenChartType = 'verticalBarChart';
  }
  onSelectAdvancedPie(event: any) {
    this.chosenChartType = 'advancedPieChart';
  }
  onSelectPie(event: any) {
    this.chosenChartType = 'pieChart';
  }
  setSwitch() {}
  openModal(): void {
    this.modalService.openModal(this.modalOptions);
    this.modalService.close.subscribe(modalResult => {
      return;
    });
  }
}
export type ChartType = 'advancedPieChart' | 'pieChart' | 'verticalBarChart';
