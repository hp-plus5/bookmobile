export class Author {
  id = 0;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'trans';
  lgbtq: boolean;

  constructor(authorObject?: Author) {
    /* the purpose of the structure below is to emphasize a negative case assumption rather than a "happy case" assumption.
    This keeps your code from spiraling to the right and make it easier to read. the "real work" should be at the very end. */
    if (!authorObject) {
      return;
    }
    this.id = authorObject.id;
    this.firstName = authorObject.firstName;
    this.lastName = authorObject.lastName;
    this.gender = authorObject.gender;
    this.lgbtq = authorObject.lgbtq;
  }
}
export function trackByAuthors(index: number, author: Author): number {
  return author.id;
}
