import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { environment } from '@environments/environment';

import { Book } from '@app/books/_models/book';
import { BookService } from '@app/books/_services/book.service';

import { asyncData, asyncError } from '@testing/async-observable-helpers';
import { expectedBooks } from '@testing/books-fixture';
import { url } from 'inspector';

describe('BookService (with spies)', () => {
  let bookService: BookService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    // TODO: not sure if i need this?
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
          cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        },
      ]),
    );
    bookService = new BookService(httpClient);
    // note how if we were doing pure mock testing, this line would go "bookService = TestBed.get(BookService);"
    httpTestingController = TestBed.get(HttpTestingController);
    const booksApiUrl = `${environment.apiUrl}/books`;
    httpClient.put(booksApiUrl);

    TestBed.configureTestingModule({
      providers: [BookService],
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected books (HttpClient called once)', () => {
    httpClient.get.and.returnValue(asyncData(expectedBooks));

    bookService
      .getBooks()
      .subscribe(
        books => expect(books).toEqual(expectedBooks, 'expected books'),
        fail,
      );
    expect(httpClient.get.identity.valueOf).toBe(
      7,
      'should be 7 books in getAll',
    );
    // don't really need to test the below code in this case, since it doesn't hurt us to call getBooks() more than once, but I want to keep the code around as a reference point.
    // expect(httpClient.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClient.get.and.returnValue(asyncError(errorResponse));

    bookService
      .getBooks()
      .subscribe(
        books => fail('expected an error, not books'),
        error => expect(error.message).toContain('test 404 error'),
      );
  });

  describe('#getBooks', () => {
    it('should return expected books (called once)', () => {
      bookService
        .getBooks()
        .subscribe(
          books =>
            expect(books).toEqual(
              expectedBooks,
              'should return expected books',
            ),
          fail,
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
          fail,
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      req.flush([]); // Respond with no books
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      bookService
        .getBooks()
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg),
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    // TODO: I'm not sure I understand the below test
    it('should return expected books (called multiple times)', () => {
      bookService.getBooks().subscribe();
      bookService.getBooks().subscribe();
      bookService
        .getBooks()
        .subscribe(
          books =>
            expect(books).toEqual(
              expectedBooks,
              'should return expected books',
            ),
          fail,
        );

      const requests = httpTestingController.match(bookService.booksApiUrl);
      expect(requests.length).toEqual(7, 'calls to getBooks()');

      // Respond to each request with different mock book results
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
          isNew(): false {
            return false;
          },
        },
      ]);
      requests[2].flush(expectedBooks);
    });
  });

  describe('#updateBook', () => {
    it('should update a book and return it', () => {
      const updateBook: Book = {
        id: 1,
        title: 'Updated Fake Harry Potter and the Fake Sorcerers Stone',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 1,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): false {
          return false;
        },
      };

      bookService
        .updateBook(updateBook)
        .subscribe(
          data => expect(data).toEqual(updateBook, 'should return the book'),
          fail,
        );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateBook);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updateBook,
      });
      req.event(expectedResponse);
    });

    // TODO: not sure that this test is correct in a spy context (instead of a mock context)
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
        isNew(): false {
          return false;
        },
      };
      bookService
        .updateBook(updateBook)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg),
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
        isNew(): false {
          return false;
        },
      };
      bookService
        .updateBook(updateBook)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(emsg),
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
        colno: 21,
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  describe('#addBook', () => {
    it('should create a book and return it', () => {
      const newBook: Book = {
        id: 8,
        title: 'Successfully Added Supposed Eighth Harry Potter',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): true {
          return true;
        },
      };

      bookService
        .addBook(newBook)
        .subscribe(
          data => expect(data).toEqual(newBook, 'should return the book'),
          fail,
        );

      // BookService should have made one request to POST book
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newBook);

      // Expect server to return the book after POST
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: newBook,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const new404Book: Book = {
        id: 8,
        title: 'User-Error on Add: Supposed Eighth Harry Potter',
        read: false,
        ownership: false,
        femaleProtagonist: false,
        femaleRoleModel: false,
        lgbtqProtagonist: false,
        lgbtqSidekick: false,
        lgbtqTheme: false,
        rating: 10,
        cover: 'http://covers.openlibrary.org/b/isbn/0385472579-S.jpg',
        isNew(): true {
          return true;
        },
      };
      bookService
        .addBook(new404Book)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg),
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
        },
      };
      bookService
        .addBook(newNetworkErrorBook)
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(networkErrorMessage),
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: networkErrorMessage,
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  describe('#deleteBook', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${bookService.booksApiUrl}/?id=${id}`;

    it('should delete a book and return a confirmation', () => {
      const id = typeof book === 'number' ? book : book.id;

      bookService
        .deleteBook(makeUrl[7])
        .subscribe(
          data =>
            expect(data).toEqual(
              expectedBooks,
              'should return only first six books',
            ),
          fail,
        );

      // BookService should have made one request to DELETE book
      const req = httpTestingController.expectOne(bookService.booksApiUrl);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual('deleted book id=7');

      // Expect server to return confirmation after DELETE
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';

      bookService
        .deleteBook(makeUrl[7])
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(msg),
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const networkMessage = 'simulated network error';

      bookService
        .deleteBook(expectedBooks[7])
        .subscribe(
          books => fail('expected to fail'),
          error => expect(error.message).toContain(networkMessage),
        );

      const req = httpTestingController.expectOne(bookService.booksApiUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: networkMessage,
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  // Here's where you'd test any other BookService methods
});
