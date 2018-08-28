import { IModalOptions } from '@app/core/modal/modal.service';

export class MockModalService {
  MockModalOptions: IModalOptions = {
    title: 'Test Modal Title',
    body: 'Test Modal Body',
    submit: 'Submit',
    cancel: 'Cancel',
  };
}
