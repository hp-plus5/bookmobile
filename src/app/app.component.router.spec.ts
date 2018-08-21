import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { DebugElement, NgModuleFactoryLoader, Type } from '@angular/core';
// For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts
// see the block of commented text around the middle of this doc for an explanation of why it contains errors
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// r - for relatively obscure router symbols
import * as r from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';

import { BooksComponent } from '@app/books/books-list/books.component';

import { asyncData, click } from '../testing';
import { Book } from './_models/book';
import { BookService } from './_services/book.service';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MostRecentBookComponent } from './most-recent-book/most-recent-book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { UnselectedBookComponent } from './unselected-book/unselected-book.component';

describe('AppComponent & RouterTestingModule', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockBookService: MockBookService;
  // tslint:disable-next-line:prefer-const
  let page: Page;
  // tslint:disable-next-line:prefer-const
  let router: Router;
  let location: SpyLocation;
  class MockBookService {
    MockBookServiceBook: Book[] = [
      {
        id: 1,
        title: 'Fake Harry Potter and the Fake Sorcerers Stone',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 7,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): false {
          return false;
        },
      },
      {
        id: 2,
        title: 'Fake Harry Potter and the Fake Chamber of Secrets',
        read: true,
        ownership: true,
        femaleProtagonist: true,
        femaleRoleModel: true,
        lgbtqProtagonist: true,
        lgbtqSidekick: true,
        lgbtqTheme: true,
        rating: 3,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): false {
          return false;
        },
      },
      {
        id: 3,
        title:
          'Fake Harry Potter and the Prisoner of Fake Azkaban where everyone is gay',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: true,
        lgbtqSidekick: true,
        lgbtqTheme: true,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): false {
          return false;
        },
      },
    ];
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: BookService, useClass: MockBookService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = this.location; // TODO: not sure about this
    mockBookService = TestBed.get(BookService);
  });

  it('should navigate to "MostRecentBookComponent" immediately', fakeAsync(() => {
    tick(); // wait for async data to arrive
    expect(location.path()).toEqual(
      '/most-recent-entries',
      'after initialNavigation()',
    );
    expectElementOf(MostRecentBookComponent);
  }));

  it('should navigate to "Books" on click', fakeAsync(() => {
    click(page.aboutLinkDe); // TODO: refactor
    // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom

    advance();
    expectPathToBe('/books');
    expectElementOf(BooksComponent);
  }));

  /*
  Everything below are examples written for the purpose of future sampling needs. My actual app component router test doesn't need these. I'm leaving them excluded from the tests to be run by leaving an "x" in front of the appropriate tests and commenting out any other relevant sample code. Unless informative/in english, assume code below should NOT be commented out for any purpose but to clear my file of errors as I don't run these tests.
 */
  xit('should navigate to "Books" w/ browser location URL change', fakeAsync(() => {
    // createComponent();
    location.simulateHashChange('/books');
    // location.go('/books'); // also works ... except, perhaps, in Stackblitz
    advance();
    // expectPathToBe('/books');
    // expectElementOf(BooksComponent);
  }));

  // Can't navigate to lazy loaded modules with this technique
  xit('should navigate to "Books" on click', fakeAsync(() => {
    // createComponent();
    page.booksLinkDe.nativeElement.click();
    advance();
    // expectPathToBe('/books');
  }));
});

// import { HeroModule } from './hero/hero.module'; // should be lazy loaded

let loader: SpyNgModuleFactoryLoader;

///////// Can't get lazy loaded Heroes to work yet
xdescribe('AppComponent & Lazy Loading (not working yet)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    // createComponent();
    loader = TestBed.get(NgModuleFactoryLoader);
    // loader.stubbedModules = { expected: HeroModule };
    // router.resetConfig([{ path: 'books', loadChildren: 'expected' }]);
  }));

  it('should navigate to "Books" on click', async(() => {
    // page.booksLinkDe.nativeElement.click();
    advance();
    // expectPathToBe('/books');
    // expectElementOf(BooksComponent);
  }));

  it('can navigate to "Heroes" w/ browser location URL change', fakeAsync(() => {
    // location.go('/heroes');
    advance();
    // expectPathToBe('/heroes');
    // expectElementOf(HeroListComponent);
  }));
});

////// Helpers /////////

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  tick(); // wait while navigating
  // fixture.detectChanges(); // update view
  tick(); // wait for async data to arrive
}

// function createComponent() {
//   fixture = TestBed.createComponent(AppComponent);
//   comp = fixture.componentInstance;

//   const injector = fixture.debugElement.injector;
//   location = injector.get(Location) as SpyLocation;
//   router = injector.get(Router);
//   router.initialNavigation();
//   spyOn(injector.get(TwainService), 'getQuote')
//     // fake fast async observable
//     .and.returnValue(asyncData('Test Quote'));
//   advance();

//   page = new Page();
// }

class Page {
  aboutLinkDe: DebugElement;
  dashboardLinkDe: DebugElement;
  booksLinkDe: DebugElement;

  // for debugging
  component: AppComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = this.fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref),
    );
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.booksLinkDe = links[1];

    // for debugging
    this.component = this.component;
    this.fixture = this.fixture;
    this.router = this.router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  let location: SpyLocation;
  location = this.location;
  expect(location.path()).toEqual(
    path,
    expectationFailOutput || 'location.path()',
  );
}

function expectElementOf(type: Type<any>): any {
  let fixture: ComponentFixture<AppComponent>;
  fixture = this.fixture;
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
