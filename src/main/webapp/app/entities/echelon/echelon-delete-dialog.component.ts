import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from './echelon.service';

@Component({
  templateUrl: './echelon-delete-dialog.component.html'
})
export class EchelonDeleteDialogComponent {
  echelon?: IEchelon;

  constructor(protected echelonService: EchelonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.echelonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('echelonListModification');
      this.activeModal.close();
    });
  }
}
