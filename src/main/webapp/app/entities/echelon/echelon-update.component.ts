import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEchelon, Echelon } from 'app/shared/model/echelon.model';
import { EchelonService } from './echelon.service';
import { ICarriere } from 'app/shared/model/carriere.model';
import { CarriereService } from 'app/entities/carriere/carriere.service';

@Component({
  selector: 'jhi-echelon-update',
  templateUrl: './echelon-update.component.html'
})
export class EchelonUpdateComponent implements OnInit {
  isSaving = false;

  carrieres: ICarriere[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    niveau: [],
    cc: [],
    ct: [],
    fo: [],
    en: [],
    ini: [],
    ag: [],
    dex: [],
    inte: [],
    fm: [],
    soc: [],
    statut: [],
    carriere: []
  });

  constructor(
    protected echelonService: EchelonService,
    protected carriereService: CarriereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ echelon }) => {
      this.updateForm(echelon);

      this.carriereService
        .query()
        .pipe(
          map((res: HttpResponse<ICarriere[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICarriere[]) => (this.carrieres = resBody));
    });
  }

  updateForm(echelon: IEchelon): void {
    this.editForm.patchValue({
      id: echelon.id,
      nom: echelon.nom,
      niveau: echelon.niveau,
      cc: echelon.cc,
      ct: echelon.ct,
      fo: echelon.fo,
      en: echelon.en,
      ini: echelon.ini,
      ag: echelon.ag,
      dex: echelon.dex,
      inte: echelon.inte,
      fm: echelon.fm,
      soc: echelon.soc,
      statut: echelon.statut,
      carriere: echelon.carriere
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const echelon = this.createFromForm();
    if (echelon.id !== undefined) {
      this.subscribeToSaveResponse(this.echelonService.update(echelon));
    } else {
      this.subscribeToSaveResponse(this.echelonService.create(echelon));
    }
  }

  private createFromForm(): IEchelon {
    return {
      ...new Echelon(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      cc: this.editForm.get(['cc'])!.value,
      ct: this.editForm.get(['ct'])!.value,
      fo: this.editForm.get(['fo'])!.value,
      en: this.editForm.get(['en'])!.value,
      ini: this.editForm.get(['ini'])!.value,
      ag: this.editForm.get(['ag'])!.value,
      dex: this.editForm.get(['dex'])!.value,
      inte: this.editForm.get(['inte'])!.value,
      fm: this.editForm.get(['fm'])!.value,
      soc: this.editForm.get(['soc'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      carriere: this.editForm.get(['carriere'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEchelon>>): void {
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

  trackById(index: number, item: ICarriere): any {
    return item.id;
  }
}
