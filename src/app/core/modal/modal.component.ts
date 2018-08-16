import { Component, OnInit } from '@angular/core';
import {
  ModalService,
  ModalOptions,
  ModalResult
} from '../../_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalOptions: ModalOptions;
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
