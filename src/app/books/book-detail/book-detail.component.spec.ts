import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '@app/books/_services/book.service';
import { MockBookService } from '@app/books/_services/book.service.fixture.spec';
import { BookDetailComponent } from '@app/books/book-detail/book-detail.component';
import { ModalService } from '@app/core/modal/modal.service';
import { MockModalService } from '@app/core/modal/modal.service.fixture.spec';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockBookService: MockBookService;
  let mockModalService: MockModalService;
  let element: HTMLElement;
  // const httpClient: HttpClient;
  // const httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      imports: [Router, Location, ActivatedRoute],
      providers: [
        BookDetailComponent,
        { BookService, useClass: MockBookService },
        { ModalService, useClass: MockModalService },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // This line is essentially what performs our data binding. It seems hinted at in the angular documentation for testing that you may need to call this in the middle of your it(test) in the case of testing DOM-related qualitities or events.

        mockBookService = TestBed.get(BookService);
        mockModalService = TestBed.get(ModalService);
        element = TestBed.get(HTMLElement);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
      fixture.debugElement.query(
        By.css('button, type:not([submit]), click([deSelectBook])'),
      );
    });

    it('Something should be emitted on click', () => {
      /* LEARNING NOTE: This blurb is about a thing that doesn't work. The code contained "createAsync", which is not a method that operates on TestBed. The old practice was using something called TestComponentBuilder, which now seems to be out of done/replaced by TestBed.
      https://stackoverflow.com/questions/35319476/any-way-to-test-eventemitter-in-angular2
      */
      // Could also create a spy console.log() and test the amount of times it's called against how many times it was meant to be called

      element.dispatchEvent(new Event('click'));
      expect(component.cancel.emit).toHaveBeenCalled();
      expect(component.cancel.isStopped).toBe(true);
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

  /**
   * This below 'describe' block isn't filled in yet, but it's a reminder that I should be testing the presentation aspect of this component as well.
   * I should be making sure that certain elements do or don't show up on the page in the DOM. Make sure you test against what's actually rendered
   * out (use the inspector in the browser) and not just calling on HTML tags as seen in the .html file.
   */

  describe('UI', () => {
    // if relevant, some example set-up code:
    beforeEach(() => {
      fixture.debugElement.query(By.css('some css class'));
    });
  });
});
