import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarriere } from 'app/shared/model/carriere.model';
import { CarriereService } from './carriere.service';

@Component({
  templateUrl: './carriere-delete-dialog.component.html'
})
export class CarriereDeleteDialogComponent {
  carriere?: ICarriere;

  constructor(protected carriereService: CarriereService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carriereService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carriereListModification');
      this.activeModal.close();
    });
  }
}
