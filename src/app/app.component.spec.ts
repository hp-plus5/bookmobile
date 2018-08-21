import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppModule } from '@app/app.module';

import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

describe('AppComponent & AppModule', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    })
      .overrideModule(AppModule, {
        remove: {
          imports: [AppRoutingModule],
        },
        add: {
          declarations: [RouterLinkDirectiveStub],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement.queryAll(
          By.directive(RouterLinkDirectiveStub),
        );

        // get attached link directive instances
        // using each DebugElement's injector
        routerLinks = linkDes.map(de =>
          de.injector.get(RouterLinkDirectiveStub),
        );
      });
  }));

  it('should create the app', async(() => {
    expect(fixture).toBeTruthy();
  }));

  it(`should have as title 'Book Database'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Book Database');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Book Database');
  }));

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(5, 'should have 5 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/books');
    expect(routerLinks[1].linkParams).toBe('/');
    expect(routerLinks[2].linkParams).toBe('/books');
    expect(routerLinks[3].linkParams).toBe('/new-book');
    expect(routerLinks[4].linkParams).toBe('/most-recent-entries');
  });
});
