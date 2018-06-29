import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentBookComponent } from './most-recent-book.component';

describe('MostRecentBookComponent', () => {
  let component: MostRecentBookComponent;
  let fixture: ComponentFixture<MostRecentBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostRecentBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
