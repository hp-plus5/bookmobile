export class Book {
  id = 0;
  title!: string;
  read!: boolean;
  ownership!: boolean;
  femaleProtagonist!: boolean;
  femaleRoleModel!: boolean;
  lgbtqProtagonist!: boolean;
  lgbtqSidekick!: boolean;
  lgbtqTheme!: boolean;
  rating = 0;
  cover!: string;
  genre!: string;
  femaleAuthor!: boolean;
  lgbtqAuthor!: boolean;

  constructor(bookObject?: Book) {
    /* the purpose of the structure below is to emphasize a negative case assumption rather than a "happy case" assumption.
    This keeps your code from spiraling to the right and make it easier to read. the "real work" should be at the very end. */
    if (!bookObject) {
      return;
    }
    this.id = bookObject.id;
    this.title = bookObject.title;
    this.read = bookObject.read;
    this.ownership = bookObject.ownership;
    this.femaleProtagonist = bookObject.femaleProtagonist;
    this.femaleRoleModel = bookObject.femaleRoleModel;
    this.lgbtqProtagonist = bookObject.lgbtqProtagonist;
    this.lgbtqSidekick = bookObject.lgbtqSidekick;
    this.lgbtqTheme = bookObject.lgbtqTheme;
    this.rating = bookObject.rating;
    this.cover = bookObject.cover;

    this.femaleAuthor = bookObject.femaleAuthor;
    this.lgbtqAuthor = bookObject.lgbtqAuthor;
  }

  isNew(): boolean {
    return this.id === 0;
  }
}

// trackByBooks allows me to iterate through my list of books within the "library" view
export function trackByBooks(index: number, book: Book): number {
  return book.id;
}
/* Association tables needed:
Form fields:
  book_author
  book_lent_to // a new row with id, name, and date for every person I lend a single book to. Many to many.
  book_series // many to one. two properties: id and series name. Goal is that they would display together, grouped within an author.
  Tags

Radio buttons:
  book_format // hardcover vs. paperback vs. comic

Checkmarks:
  book_language // german, spanish, english, other

Other:
  book_cover // three properties: id, boolean Person, string Color // file input
  book_genre // dropdown


Total checkmarks: 6
Total radio buttons: 3, plus rating
Total block-type fields: 6

*/
