import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnselectedBookComponent } from './unselected-book.component';

describe('UnselectedBookComponent', () => {
  let component: UnselectedBookComponent;
  let fixture: ComponentFixture<UnselectedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnselectedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnselectedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
