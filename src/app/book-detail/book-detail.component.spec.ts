import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { BookService } from '../_services/book.service';
import {
  ModalService,
  ModalOptions,
  ModalResult
} from '../_services/modal.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { HttpTestingController } from '../../../node_modules/@angular/common/http/testing';
import { Book } from '../_models/book';
import { By } from '../../../node_modules/protractor';
import { DebugElement } from '../../../node_modules/@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockBookService: MockBookService;
  let mockModalService: MockModalService;
  let element: HTMLElement;
  // const httpClient: HttpClient;
  // const httpTestingController: HttpTestingController;

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
        }
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
        }
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
        }
      }
    ];
  }
  class MockModalService {
    MockModalOptions: ModalOptions = {
      title: 'Test Modal Title',
      body: 'Test Modal Body',
      submit: 'Submit',
      cancel: 'Cancel'
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      imports: [Router, Location, ActivatedRoute],
      providers: [
        BookDetailComponent,
        { BookService, useClass: MockBookService },
        { ModalService, useClass: MockModalService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // This line is essentially what performs our data binding. It seems hinted at in the angular documentation for testing that you may need to call this in the middle of your it(test) in the case of testing DOM-related qualitities or events.

    mockBookService = TestBed.get(BookService);
    mockModalService = TestBed.get(ModalService);
    element = TestBed.get(HTMLElement);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: do I even need these next few lines???
  let httpClientSpy: { get: jasmine.Spy };
  let bookService: BookService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    bookService = new BookService(<any>httpClientSpy);
  });
  // to here

  /*
  The mocking strategy below would go at the top of an it(test), not within the beforeEach.
  This strategy doesn't test the template of the component, it only tests the class of the component. So for some tests you'll want to test the entire compiled component (template AND class) and for some you don't need all of that. TestBed() compiles an entire component before runtime so that you have access to it, and is done in a beforeEach(), but if you don't need all that then you can mock your data inside of an it(test) like so. (Or if none of your tests for a component require an template, then obviously you can just make this AS your beforeEach().)

  const comp = new BookDetailComponent();
  const book: Book = {
    id: 1,
    title: 'Fake Harry Potter and the Fake Sorcerers Stone',
    read: false,
    ownership: false,
    femaleProtagonist: false,
    femaleRoleModel: false,
    lgbtqProtagonist: false,
    lgbtqSidekick: false,
    lgbtqTheme: false,
    rating: 1,
    cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
    // tslint:disable-next-line:semicolon
    isNew(): false {
      return false;
    }
  };
  */

  describe('#deSelectBook', () => {
    beforeEach(() => {
      element = element.querySelector(
        'button, type:not([submit]), click([deSelectBook])'
      );
      // TODO: 3. is this too vague for my emit tests? if not, how do I specify my exact desired HTML element syntactically?
    });

    it('Something should be emitted on click', () => {
      /* LEARNING NOTE: This blurb is about a thing that doesn't work. The code contained "createAsync", which is not a method that operates on TestBed. The old practice was using something called TestComponentBuilder, which now seems to be out of done/replaced by TestBed.
      https://stackoverflow.com/questions/35319476/any-way-to-test-eventemitter-in-angular2
      */
      // Could also create a spy console.log() and test the amount of times it's called against how many times it was meant to be called

      this.component.deSelectBook(); // if so, erase beforeEach()
      // TODO: 1. OR
      element.dispatchEvent(new Event('click'));

      expect(component.cancel.closed).toHaveBeenCalled();
      // TODO: 2. is the above line the correct way to test just to see if SOMETHING has been emitted?
    });

    it('#cancel should be what"s emitted on click', () => {
      // ?? based on instance above
      expect(component.cancel.emit).toHaveBeenCalled();
    });

    it('#MouseEvent() should stop propagation', () => {
      // to test: does ngForm see an event?
      const mouseEvent: MouseEvent = new MouseEvent('');
      expect(mouseEvent).toBe(true);
      component.deSelectBook(mouseEvent);

      fixture.whenStable().then(() => {
        expect(mouseEvent).toBe(false);
      });
    });
  });
});
