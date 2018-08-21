import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  open: Subject<ModalOptions> = new Subject();
  // "open" will emit events. subject will be our modalOptions. Think of Subject as being a pipe. This is the source that we'll hand to our modal component, and then we'll subscribe to it in the [modal] component. If the subject is what watches for changes, the observable IS those changes / it's what comes out of the pipe.

  close: Subject<ModalResult> = new Subject();

  constructor() {}

  openModal(options: ModalOptions): void {
    this.open.next(options);
    // .next is putting something into the pipe. So when external components call on this, it'll be a means for them to put things into the pipe we've made ("open"). This pipe is meant to pass modalOptions information/the text that goes into the modal.
    // Should this be .asObservable() to avoid exposure to users?
  }

  closeModal(modalResult: ModalResult): void {
    const options = undefined;
    this.open.next(options);
    // by removing modalOptions, the ngIf statement on our modal template is now false, triggering a display:none for the modal. we stil need to listen on "open" to see when this change occurs.
    this.close.next(modalResult);
    // we pass the component that called a modal in the first place (henceforth "original component") the "close" subject, which the original component then turns into whatever it sees clicked (by calling on this method, which then puts in the pipe (via .next) whatever was passed to it as a modalResult). This action calls whatever method the original component decides to pass it, be it deleteBook or updateBook or whatever.
  }
}

export interface ModalOptions {
  title: string;
  body: string;
  submit: string;
  cancel: string;
}

export type ModalResult = 'submit' | 'cancel';
