import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChartsViewComponent } from './custom-charts-view.component';

describe('CustomChartsViewComponent', () => {
  let component: CustomChartsViewComponent;
  let fixture: ComponentFixture<CustomChartsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomChartsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChartsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
