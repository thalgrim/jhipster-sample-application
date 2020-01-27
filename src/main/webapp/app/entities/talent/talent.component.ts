import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalent } from 'app/shared/model/talent.model';
import { TalentService } from './talent.service';
import { TalentDeleteDialogComponent } from './talent-delete-dialog.component';

@Component({
  selector: 'jhi-talent',
  templateUrl: './talent.component.html'
})
export class TalentComponent implements OnInit, OnDestroy {
  talents?: ITalent[];
  eventSubscriber?: Subscription;

  constructor(protected talentService: TalentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.talentService.query().subscribe((res: HttpResponse<ITalent[]>) => {
      this.talents = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTalents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITalent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTalents(): void {
    this.eventSubscriber = this.eventManager.subscribe('talentListModification', () => this.loadAll());
  }

  delete(talent: ITalent): void {
    const modalRef = this.modalService.open(TalentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.talent = talent;
  }
}
