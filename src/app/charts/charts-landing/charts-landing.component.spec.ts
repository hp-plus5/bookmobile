import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsLandingComponent } from '@app/charts/charts-landing/charts-landing.component';

describe('ChartsGenreComponent', () => {
  let component: ChartsLandingComponent;
  let fixture: ComponentFixture<ChartsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsLandingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
