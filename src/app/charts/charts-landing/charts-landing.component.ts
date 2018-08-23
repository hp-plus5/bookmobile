import { Component, OnInit } from '@angular/core';

import { multi, single } from '@app/charts/charts-landing/charts-landing.fixture.spec';
import { IModalOptions, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-charts-landing',
  templateUrl: './charts-landing.component.html',
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
    this.openModal();
    // }
  }
  onSelect(event: any) {
    // tslint:disable-next-line:no-console
    console.log(event);
  }
  openModal(): void {
    this.modalService.openModal(this.modalOptions);
    this.modalService.close.subscribe(modalResult => {
      return;
    });
  }
}
