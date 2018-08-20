import { TestBed, inject } from '@angular/core/testing';
import { asyncData, asyncError } from '../../testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Book } from '../_models/book';
import { BookService } from './book.service';
import {
  HttpErrorResponse,
  HttpClient,
  HttpResponse
} from '../../../node_modules/@angular/common/http';
import { of } from '../../../node_modules/rxjs';

describe('BookService (with spies)', () => {
  let bookService: BookService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    httpClient.get.and.returnValue(
      of([
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
          rating: 1,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        }
      ])
    );
    bookService = new BookService(httpClient);

    TestBed.configureTestingModule({
      providers: [BookService]
    });
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));
  // TODO: Below is where I started mocking data. Should I have waited until farther down where it says 'BookService (with mocks)'?
  // TODO: Isn't this where my data should reflect something returned by an API? If so, shouldn't it not need an isNew property? Why is it mad at me??? :(
  it('should return expected books (HttpClient called once)', () => {
    const expectedBooks: Book[] = [
      {
        id: 1,
        title: 'Harry Potter and the Sorcerers Stone',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): false {
          return false;
        }
      },
      {
        id: 2,
        title: 'Harry Potter and the Chamber of Secrets',
        read: true,
        ownership: true,
        femaleProtagonist: true,
        femaleRoleModel: true,
        lgbtqProtagonist: true,
        lgbtqSidekick: true,
        lgbtqTheme: true,
        rating: 7,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      },
      {
        id: 3,
        title: 'Harry Potter and the Prisoner of Azkaban',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      },
      {
        id: 4,
        title: 'Harry Potter and the Goblet of Fire',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 7,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      },
      {
        id: 5,
        title: 'Harry Potter and the Order of the Phoenix',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 9,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      },
      {
        id: 6,
        title: 'Harry Potter and the Half-Blood Prince',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 9,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      },
      {
        id: 7,
        title: 'Harry Potter and the Deathly Hallows',
        read: true,
        ownership: true,
        femaleProtagonist: false,
        femaleRoleModel: true,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 7,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): false {
          return false;
        }
      }
    ];

    httpClient.get.and.returnValue(asyncData(expectedBooks));

    bookService
      .getBooks()
      .subscribe(
        books => expect(books).toEqual(expectedBooks, 'expected books'),
        fail
      );
    expect(httpClient.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClient.get.and.returnValue(asyncError(errorResponse));

    bookService
      .getBooks()
      .subscribe(
        books => fail('expected an error, not books'),
        error => expect(error.message).toContain('test 404 error')
      );
  });
});

describe('BookService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [BookService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    bookService = TestBed.get(BookService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// BookService method tests begin ///

  describe('#getBooks', () => {
    let expectedBooks: Book[];
    // TODO: is this "describe" section where data mocking would go, or is having it in the lower segment the decider between whether data is generated once for this entire section vs. once per unit test vs. once per methodID (ie #getBooks)? SEE line 245's unit test. Is its toEqual(0) an indicator that the mocked data doesn't get to that segment of the code? If so, why then is it called "beforeEach"?

    beforeEach(() => {
      bookService = TestBed.get(BookService);
      expectedBooks = [
        {
          id: 1,
          title: 'Harry Potter and the Sorcerers Stone',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 2,
          title: 'Harry Potter and the Chamber of Secrets',
          read: true,
          ownership: true,
          femaleProtagonist: true,
          femaleRoleModel: true,
          lgbtqProtagonist: true,
          lgbtqSidekick: true,
          lgbtqTheme: true,
          rating: 7,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 3,
          title: 'Harry Potter and the Prisoner of Azkaban',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 4,
          title: 'Harry Potter and the Goblet of Fire',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 7,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 5,
          title: 'Harry Potter and the Order of the Phoenix',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 9,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 6,
          title: 'Harry Potter and the Half-Blood Prince',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 9,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 7,
          title: 'Harry Potter and the Deathly Hallows',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 7,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        },
        {
          id: 8,
          title: 'No Rating!',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg'
        }
      ] as Book[];
    });

    it('should return expected books (called once)', () => {
      bookService
        .getBooks()
        .subscribe(
          books =>
            expect(books).toEqual(
              expectedBooks,
              'should return expected books'
            ),
          fail
        );

      // BookService should have made one request to GET books from expected URL
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock books
      req.flush(expectedBooks);
    });

    it('should be OK returning no books', () => {
      bookService
        .getBooks()
        .subscribe(
          books =>
            expect(books.length).toEqual(0, 'should have empty books array'),
          fail
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      req.flush([]); // Respond with no books
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      bookService
        .getBooks()
        .subscribe(
          heroes => fail('expected to fail'),
          error => expect(error.message).toContain(msg)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected heroes (called multiple times)', () => {
      bookService.getBooks().subscribe();
      bookService.getBooks().subscribe();
      bookService
        .getBooks()
        .subscribe(
          books =>
            expect(books).toEqual(
              expectedBooks,
              'should return expected books'
            ),
          fail
        );

      const requests = httpTestingController.match(bookService.booksApiUrl);
      expect(requests.length).toEqual(7, 'calls to getBooks()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([
        {
          id: 1,
          title: 'Bobs Fake Harry Potter and the Fake Sorcerers Stone',
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
        }
      ]);
      requests[2].flush(expectedBooks);
    });
  });

  describe('#updateBook', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${bookService.booksApiUrl}/?id=${id}`;

    it('should update a book and return it', () => {
      const updateBook: Book = {
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

      bookService
        .updateBook(updateBook)
        .subscribe(
          data => expect(data).toEqual(updateBook, 'should return the book'),
          fail
        );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateBook);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updateBook
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const updateBook: Book = {
        id: 1,
        title: 'Super Fake Harry Potter and the Fake Sorcerers Stone',
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
      bookService
        .updateBook(updateBook)
        .subscribe(
          heroes => fail('expected to fail'),
          error => expect(error.message).toContain(msg)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';

      const updateBook: Book = {
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
      bookService
        .updateBook(updateBook)
        .subscribe(
          heroes => fail('expected to fail'),
          error => expect(error.message).toContain(emsg)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: emsg,
        // The rest of this is optional and not used.
        // Just showing that you could provide this too.
        filename: 'BookService.ts',
        lineno: 42,
        colno: 21
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  describe('#addBook', () => {
    it('should create a book and return it', () => {
      const newBook: Book = {
        id: 9,
        title: 'Successfully Added Supposed Ninth Harry Potter',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): true {
          return true;
        }
      };

      bookService
        .addBook(newBook)
        .subscribe(
          data => expect(data).toEqual(newBook, 'should return the book'),
          fail
        );

      // HeroService should have made one request to POST hero
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newBook);

      // Expect server to return the hero after POST
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: newBook
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const new404Book: Book = {
        id: 9,
        title: 'User-Error on Add: Supposed Ninth Harry Potter',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): true {
          return true;
        }
      };
      bookService
        .addBook(new404Book)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const networkErrorMessage = 'simulated network error';

      const newNetworkErrorBook: Book = {
        id: 9,
        title: 'Network-Error on Add: Supposed Ninth Harry Potter',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        // tslint:disable-next-line:semicolon
        isNew(): true {
          return true;
        }
      };
      bookService
        .addBook(newNetworkErrorBook)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(networkErrorMessage)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: networkErrorMessage
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  describe('#deleteBook', () => {
    // Expecting the query form of URL so should not 404 when id not found
    // I don't understand this part. "makeUrl" as a variable in the heroes tutorial is never utilized after being made.
    const makeUrl = (id: number) => `${bookService.booksApiUrl}/?id=${id}`;

    it('should delete a book and return a confirmation', () => {
      const expectedBooks: Book[] = [
        {
          id: 1,
          title: 'Harry Potter and the Sorcerers Stone',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
          // tslint:disable-next-line:semicolon
          isNew(): false {
            return false;
          }
        },
        {
          id: 2,
          title: 'Harry Potter and the Chamber of Secrets',
          read: true,
          ownership: true,
          femaleProtagonist: true,
          femaleRoleModel: true,
          lgbtqProtagonist: true,
          lgbtqSidekick: true,
          lgbtqTheme: true,
          rating: 7,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
          // tslint:disable-next-line:semicolon
          isNew(): false {
            return false;
          }
        },
        {
          id: 3,
          title: 'Harry Potter and the Prisoner of Azkaban',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
          // tslint:disable-next-line:semicolon
          isNew(): false {
            return false;
          }
        }
      ];

      bookService
        .deleteBook(makeUrl[3])
        .subscribe(
          data =>
            expect(data).toEqual(
              expectedBooks,
              'should return only two books, not including the Prisoner of Azkaban'
            ),
          fail
        );

      // BookService should have made one request to DELETE book
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual('deleted book id=3');

      // Expect server to return confirmation after DELETE
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK'
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const expectedBooks: Book[] = [
        {
          id: 1,
          title: 'Harry Potter and the Sorcerers Stone',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
          // tslint:disable-next-line:semicolon
          isNew(): false {
            return false;
          }
        }
      ];

      bookService
        .deleteBook(makeUrl[1]) // Am I calling this correctly? We WANT a book that's not there, right? Is there any point to me mocking the above expectedBooks data?
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const networkMessage = 'simulated network error';
      const expectedBooks: Book[] = [
        {
          id: 1,
          title: 'Harry Potter and the Sorcerers Stone',
          read: true,
          ownership: true,
          femaleProtagonist: false,
          femaleRoleModel: true,
          lgbtqProtagonist: false,
          lgbtqSidekick: false,
          lgbtqTheme: false,
          rating: 10,
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
          // tslint:disable-next-line:semicolon
          isNew(): false {
            return false;
          }
        }
      ];

      bookService
        .deleteBook(expectedBooks[1])
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(networkMessage)
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: networkMessage
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  // Here's where you'd test any other BookService methods
});
