import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITalent } from 'app/shared/model/talent.model';
import { TalentService } from './talent.service';

@Component({
  templateUrl: './talent-delete-dialog.component.html'
})
export class TalentDeleteDialogComponent {
  talent?: ITalent;

  constructor(protected talentService: TalentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.talentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('talentListModification');
      this.activeModal.close();
    });
  }
}
