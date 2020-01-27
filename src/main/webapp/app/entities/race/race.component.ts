import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRace } from 'app/shared/model/race.model';
import { RaceService } from './race.service';
import { RaceDeleteDialogComponent } from './race-delete-dialog.component';

@Component({
  selector: 'jhi-race',
  templateUrl: './race.component.html'
})
export class RaceComponent implements OnInit, OnDestroy {
  races?: IRace[];
  eventSubscriber?: Subscription;

  constructor(protected raceService: RaceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.raceService.query().subscribe((res: HttpResponse<IRace[]>) => {
      this.races = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRaces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRace): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRaces(): void {
    this.eventSubscriber = this.eventManager.subscribe('raceListModification', () => this.loadAll());
  }

  delete(race: IRace): void {
    const modalRef = this.modalService.open(RaceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.race = race;
  }
}
