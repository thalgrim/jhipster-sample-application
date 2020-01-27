import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPossession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';

@Component({
  templateUrl: './possession-delete-dialog.component.html'
})
export class PossessionDeleteDialogComponent {
  possession?: IPossession;

  constructor(
    protected possessionService: PossessionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.possessionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('possessionListModification');
      this.activeModal.close();
    });
  }
}
