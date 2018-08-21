import { Book } from '../app/_models/book';

export const expectedBooks: Book[] = [
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
    isNew(): false {
      return false;
    }
  }
];
