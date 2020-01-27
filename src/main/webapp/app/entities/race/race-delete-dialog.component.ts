import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRace } from 'app/shared/model/race.model';
import { RaceService } from './race.service';

@Component({
  templateUrl: './race-delete-dialog.component.html'
})
export class RaceDeleteDialogComponent {
  race?: IRace;

  constructor(protected raceService: RaceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.raceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('raceListModification');
      this.activeModal.close();
    });
  }
}
