import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICarriere, Carriere } from 'app/shared/model/carriere.model';
import { CarriereService } from './carriere.service';
import { IPersonnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from 'app/entities/personnage/personnage.service';

@Component({
  selector: 'jhi-carriere-update',
  templateUrl: './carriere-update.component.html'
})
export class CarriereUpdateComponent implements OnInit {
  isSaving = false;

  personnages: IPersonnage[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    personnage: []
  });

  constructor(
    protected carriereService: CarriereService,
    protected personnageService: PersonnageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carriere }) => {
      this.updateForm(carriere);

      this.personnageService
        .query()
        .pipe(
          map((res: HttpResponse<IPersonnage[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPersonnage[]) => (this.personnages = resBody));
    });
  }

  updateForm(carriere: ICarriere): void {
    this.editForm.patchValue({
      id: carriere.id,
      nom: carriere.nom,
      personnage: carriere.personnage
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carriere = this.createFromForm();
    if (carriere.id !== undefined) {
      this.subscribeToSaveResponse(this.carriereService.update(carriere));
    } else {
      this.subscribeToSaveResponse(this.carriereService.create(carriere));
    }
  }

  private createFromForm(): ICarriere {
    return {
      ...new Carriere(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      personnage: this.editForm.get(['personnage'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarriere>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPersonnage): any {
    return item.id;
  }
}
