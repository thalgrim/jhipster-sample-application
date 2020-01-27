import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITalent, Talent } from 'app/shared/model/talent.model';
import { TalentService } from './talent.service';
import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from 'app/entities/echelon/echelon.service';

@Component({
  selector: 'jhi-talent-update',
  templateUrl: './talent-update.component.html'
})
export class TalentUpdateComponent implements OnInit {
  isSaving = false;

  echelons: IEchelon[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    maxi: [],
    test: [],
    description: [],
    echelon: []
  });

  constructor(
    protected talentService: TalentService,
    protected echelonService: EchelonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talent }) => {
      this.updateForm(talent);

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

  updateForm(talent: ITalent): void {
    this.editForm.patchValue({
      id: talent.id,
      nom: talent.nom,
      maxi: talent.maxi,
      test: talent.test,
      description: talent.description,
      echelon: talent.echelon
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const talent = this.createFromForm();
    if (talent.id !== undefined) {
      this.subscribeToSaveResponse(this.talentService.update(talent));
    } else {
      this.subscribeToSaveResponse(this.talentService.create(talent));
    }
  }

  private createFromForm(): ITalent {
    return {
      ...new Talent(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      maxi: this.editForm.get(['maxi'])!.value,
      test: this.editForm.get(['test'])!.value,
      description: this.editForm.get(['description'])!.value,
      echelon: this.editForm.get(['echelon'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalent>>): void {
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
