import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from './echelon.service';
import { EchelonDeleteDialogComponent } from './echelon-delete-dialog.component';

@Component({
  selector: 'jhi-echelon',
  templateUrl: './echelon.component.html'
})
export class EchelonComponent implements OnInit, OnDestroy {
  echelons?: IEchelon[];
  eventSubscriber?: Subscription;

  constructor(protected echelonService: EchelonService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.echelonService.query().subscribe((res: HttpResponse<IEchelon[]>) => (this.echelons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEchelons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEchelon): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEchelons(): void {
    this.eventSubscriber = this.eventManager.subscribe('echelonListModification', () => this.loadAll());
  }

  delete(echelon: IEchelon): void {
    const modalRef = this.modalService.open(EchelonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.echelon = echelon;
  }
}
