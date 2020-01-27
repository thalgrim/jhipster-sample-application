import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICompetence, Competence } from 'app/shared/model/competence.model';
import { CompetenceService } from './competence.service';
import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from 'app/entities/echelon/echelon.service';

@Component({
  selector: 'jhi-competence-update',
  templateUrl: './competence-update.component.html'
})
export class CompetenceUpdateComponent implements OnInit {
  isSaving = false;

  echelons: IEchelon[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    caracteristique: [],
    deBase: [],
    groupee: [],
    echelon: []
  });

  constructor(
    protected competenceService: CompetenceService,
    protected echelonService: EchelonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ competence }) => {
      this.updateForm(competence);

      this.echelonService
        .query()
        .pipe(
          map((res: HttpResponse<IEchelon[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEchelon[]) => (this.echelons = resBody));
    });
  }

  updateForm(competence: ICompetence): void {
    this.editForm.patchValue({
      id: competence.id,
      nom: competence.nom,
      caracteristique: competence.caracteristique,
      deBase: competence.deBase,
      groupee: competence.groupee,
      echelon: competence.echelon
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const competence = this.createFromForm();
    if (competence.id !== undefined) {
      this.subscribeToSaveResponse(this.competenceService.update(competence));
    } else {
      this.subscribeToSaveResponse(this.competenceService.create(competence));
    }
  }

  private createFromForm(): ICompetence {
    return {
      ...new Competence(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      caracteristique: this.editForm.get(['caracteristique'])!.value,
      deBase: this.editForm.get(['deBase'])!.value,
      groupee: this.editForm.get(['groupee'])!.value,
      echelon: this.editForm.get(['echelon'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompetence>>): void {
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

  trackById(index: number, item: IEchelon): any {
    return item.id;
  }
}
