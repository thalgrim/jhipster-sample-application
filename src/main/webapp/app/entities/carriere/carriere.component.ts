import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarriere } from 'app/shared/model/carriere.model';
import { CarriereService } from './carriere.service';
import { CarriereDeleteDialogComponent } from './carriere-delete-dialog.component';

@Component({
  selector: 'jhi-carriere',
  templateUrl: './carriere.component.html'
})
export class CarriereComponent implements OnInit, OnDestroy {
  carrieres?: ICarriere[];
  eventSubscriber?: Subscription;

  constructor(protected carriereService: CarriereService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.carriereService.query().subscribe((res: HttpResponse<ICarriere[]>) => (this.carrieres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarrieres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarriere): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarrieres(): void {
    this.eventSubscriber = this.eventManager.subscribe('carriereListModification', () => this.loadAll());
  }

  delete(carriere: ICarriere): void {
    const modalRef = this.modalService.open(CarriereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carriere = carriere;
  }
}
