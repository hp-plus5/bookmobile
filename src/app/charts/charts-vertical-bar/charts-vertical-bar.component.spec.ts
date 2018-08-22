import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    ChartsVerticalBarComponent
} from '@app/charts/charts-vertical-bar/charts-vertical-bar.component';

describe('ChartsGenreComponent', () => {
  let component: ChartsVerticalBarComponent;
  let fixture: ComponentFixture<ChartsVerticalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsVerticalBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsVerticalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
