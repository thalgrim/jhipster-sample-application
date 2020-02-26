import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPossession, Possession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';
import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from 'app/entities/echelon/echelon.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe/classe.service';

type SelectableEntity = IEchelon | IClasse;

@Component({
  selector: 'jhi-possession-update',
  templateUrl: './possession-update.component.html'
})
export class PossessionUpdateComponent implements OnInit {
  isSaving = false;
  echelons: IEchelon[] = [];
  classes: IClasse[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    echelon: [],
    classe: []
  });

  constructor(
    protected possessionService: PossessionService,
    protected echelonService: EchelonService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ possession }) => {
      this.updateForm(possession);

      this.echelonService.query().subscribe((res: HttpResponse<IEchelon[]>) => (this.echelons = res.body || []));

      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    });
  }

  updateForm(possession: IPossession): void {
    this.editForm.patchValue({
      id: possession.id,
      nom: possession.nom,
      echelon: possession.echelon,
      classe: possession.classe
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const possession = this.createFromForm();
    if (possession.id !== undefined) {
      this.subscribeToSaveResponse(this.possessionService.update(possession));
    } else {
      this.subscribeToSaveResponse(this.possessionService.create(possession));
    }
  }

  private createFromForm(): IPossession {
    return {
      ...new Possession(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      echelon: this.editForm.get(['echelon'])!.value,
      classe: this.editForm.get(['classe'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPossession>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
