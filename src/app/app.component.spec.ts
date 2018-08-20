import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterLinkDirectiveStub } from '../testing';

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent & AppModule', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    })
      .overrideModule(AppModule, {
        remove: {
          imports: [AppRoutingModule]
        },
        add: {
          declarations: [RouterLinkDirectiveStub]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    // TODO: is the above line actually what I want, or is this just a repeat of fixture.componentInstance?
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Book Database'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Book Database');
  }));
  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Book Database');
  }));
  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(5, 'should have 5 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/books');
    expect(routerLinks[1].linkParams).toBe('/');
    expect(routerLinks[2].linkParams).toBe('/books');
    expect(routerLinks[3].linkParams).toBe('/new-book');
    expect(routerLinks[4].linkParams).toBe('/most-recent-entries');
  });
});
