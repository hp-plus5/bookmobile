export class Book {
  id: number;
  title: string;
  read: boolean; /* Radio button */
  ownership: boolean; /* Radio button */
  female_protagonist: boolean; /* Checkmark */
  female_role_model: boolean; /* Checkmark */
  lgbtq_protagonist: boolean; /* Checkmark */
  lgbtq_sidekick: boolean; /* Checkmark */
  lgbtq_theme: boolean; /* Checkmark */
  rating: number;
}

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
