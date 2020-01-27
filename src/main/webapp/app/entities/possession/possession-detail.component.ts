import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPossession } from 'app/shared/model/possession.model';

@Component({
  selector: 'jhi-possession-detail',
  templateUrl: './possession-detail.component.html'
})
export class PossessionDetailComponent implements OnInit {
  possession: IPossession | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ possession }) => {
      this.possession = possession;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
