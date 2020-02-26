import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from './personnage.service';

@Component({
  templateUrl: './personnage-delete-dialog.component.html'
})
export class PersonnageDeleteDialogComponent {
  personnage?: IPersonnage;

  constructor(
    protected personnageService: PersonnageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personnageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personnageListModification');
      this.activeModal.close();
    });
  }
}
