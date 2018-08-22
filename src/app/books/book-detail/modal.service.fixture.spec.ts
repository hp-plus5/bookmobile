import { IModalOptions } from '@app/books/_services/modal.service';

export class MockModalService {
  MockModalOptions: IModalOptions = {
    title: 'Test Modal Title',
    body: 'Test Modal Body',
    submit: 'Submit',
    cancel: 'Cancel',
  };
}
