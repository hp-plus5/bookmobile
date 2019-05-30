# bookmobile 📚🚌

The bookmobile is a web app to help one sort through one's library, mentally and physically. It provides various form fields for users to add books to a database (see `BookDatabaseApi.Web`, a REST api written in C#) and charts to help users see what their reading patterns and preferences are.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8. It was later updated to version 8.0.0.

## Development server & Build

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The build artifacts will be stored in the `dist/` directory. Alternatively, one could run `ng serve` and use the `--prod` flag for a production build.

To load the data to fill this client shell, clone the `BookDatabaseApi.Web` repository and build it.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io). This should open a new browser window to view results. There is also currently a branch running in which Sam is trying out Spectator as a tool.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). No tests are currently implemented.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To see more information concerning NPM, see [NPM's docs](https://docs.npmjs.com/).

## Possible Future Features and Tweaks

- Allowing the user to sort books alphabetically by title or by author last name
- Allowing the user to search their books more efficiently, whether by title or by other field
- For all that I'm calling it the bookmobile, this is extraordinarily un-mobile friendly. Add media queries.
- Better take advantage of Angular CDK. With that, keep an open mind to moving from bootstrap Journal to Angular Material.
- Tackle `Charts` feature's visual ugliness
- **Book data**: add fields for the following:

 1. Allow an individual group to be selected to be added to a series (and given an order)
 2. Ask the user if they've loaned this book out to someone
 3. Ask the user where they read this book -- do they own it? Did they get it from the local library? Who recommended it? Currently implemented simply via boolean values for "ownership" and "read". Ideally some form of accordion in form that asks questions depending on what the user says. Example: `Did you loan this book out to someone? Y N` could lead to the user selecting `Y`, and from there the app would ask something like, `To whom did you loan this book? ________`. And, if those forms are already filled out on GET, supplying a button to indicate that the book was returned - and keep a record of past loanees.
 4. Languages (allow multiselect)
 5. Wish-Lists
 6. "Playlists" of books; adding and reordering from custom lists
 7. Book format (hardcover, soft cover, audiobook)
 8. Add book cover to books (currently a branch in operation). Can be done via image upload from user (👎) or ISBN lookup or scan (👍)
 9. Genre as a dropdown menu

### Angular 8 Update To Do List

- Change lazy loading syntax
- Update Node
- `ng update --all`
