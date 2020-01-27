import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonnage } from 'app/shared/model/personnage.model';

@Component({
  selector: 'jhi-personnage-detail',
  templateUrl: './personnage-detail.component.html'
})
export class PersonnageDetailComponent implements OnInit {
  personnage: IPersonnage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnage }) => {
      this.personnage = personnage;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
