import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        id: 0,
        title: 'No Rating!',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false
      },
      {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 10
      },
      {
        id: 2,
        title: 'Harry Potter and the Chamber of Secrets',
        read: true,
        ownership: true,
        female_protagonist: true,
        female_role_model: true,
        lgbtq_protagonist: true,
        lgbtq_sidekick: true,
        lgbtq_theme: true,
        rating: 7
      },
      {
        id: 3,
        title: 'Harry Potter and the Prisoner of Azkaban',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 10
      },
      {
        id: 4,
        title: 'Harry Potter and the Goblet of Fire',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 7
      },
      {
        id: 5,
        title: 'Harry Potter and the Order of the Phoenix',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 9
      },
      {
        id: 6,
        title: 'Harry Potter and the Half-Blood Prince',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 9
      },
      {
        id: 7,
        title: 'Harry Potter and the Deathly Hallows',
        read: true,
        ownership: true,
        female_protagonist: false,
        female_role_model: true,
        lgbtq_protagonist: false,
        lgbtq_sidekick: false,
        lgbtq_theme: false,
        rating: 7
      }
    ];
    return { books };
  }
}
