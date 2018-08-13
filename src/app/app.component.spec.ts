import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterLinkDirectiveStub } from '../testing';

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent & AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    })
     // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRoutingModule ]
      },
      add: {
        declarations: [ RouterLinkDirectiveStub, RouterOutletStubComponent ]
      }
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  tests();
});
  }));


  function tests() {
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDes: DebugElement[];


  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Book Database'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Book Database');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to book-database!'
    );
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
