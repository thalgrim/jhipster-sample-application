import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalent } from 'app/shared/model/talent.model';

@Component({
  selector: 'jhi-talent-detail',
  templateUrl: './talent-detail.component.html'
})
export class TalentDetailComponent implements OnInit {
  talent: ITalent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talent }) => {
      this.talent = talent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
