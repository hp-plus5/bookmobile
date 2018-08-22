import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';

import { AppComponent } from '@app/app.component';

export class Page {
  aboutLinkDe: DebugElement;
  dashboardLinkDe: DebugElement;
  booksLinkDe: DebugElement;

  // for debugging
  component: AppComponent;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = this.fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref),
    );
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.booksLinkDe = links[1];

    // for debugging
    this.component = this.component;
    this.fixture = this.fixture;
    this.router = this.router;
  }
}
