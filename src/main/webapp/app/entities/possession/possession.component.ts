import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPossession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';
import { PossessionDeleteDialogComponent } from './possession-delete-dialog.component';

@Component({
  selector: 'jhi-possession',
  templateUrl: './possession.component.html'
})
export class PossessionComponent implements OnInit, OnDestroy {
  possessions?: IPossession[];
  eventSubscriber?: Subscription;

  constructor(protected possessionService: PossessionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.possessionService.query().subscribe((res: HttpResponse<IPossession[]>) => {
      this.possessions = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPossessions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPossession): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPossessions(): void {
    this.eventSubscriber = this.eventManager.subscribe('possessionListModification', () => this.loadAll());
  }

  delete(possession: IPossession): void {
    const modalRef = this.modalService.open(PossessionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.possession = possession;
  }
}
