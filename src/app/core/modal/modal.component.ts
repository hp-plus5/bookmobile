import { Component, OnInit } from '@angular/core';

import { IModalOptions, ModalResult, ModalService } from '@app/core/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  modalOptions: IModalOptions | undefined;
  // with "modalOptions!: ModalOptions" (no | undefined) lint is warning us that this variable may show up as undefined later in our code. but because we as the dev know that it's defined within the ngOnInit, we add the ! to tell lint to go away; 'we know what we're doing'.
  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.open.subscribe(options => {
      this.modalOptions = options;
    });
  }
  closeModal(modalResult: ModalResult): void {
    this.modalService.closeModal(modalResult);
  }
}
