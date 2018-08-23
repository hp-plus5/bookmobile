import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@environments/environment';

import { Book } from '@app/books/_models/book';

export class MockBookService {
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

  private _booksApiUrl = `${environment.apiUrl}/books`;
  booksApiUrl = this._booksApiUrl;
  getBooksApiUrl() {
    return this.booksApiUrl;
  }
}
