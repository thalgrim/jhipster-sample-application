import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICarriere, Carriere } from 'app/shared/model/carriere.model';
import { CarriereService } from './carriere.service';
import { IEchelon } from 'app/shared/model/echelon.model';
import { EchelonService } from 'app/entities/echelon/echelon.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe/classe.service';

type SelectableEntity = IEchelon | IClasse;

@Component({
  selector: 'jhi-carriere-update',
  templateUrl: './carriere-update.component.html'
})
export class CarriereUpdateComponent implements OnInit {
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
    protected carriereService: CarriereService,
    protected echelonService: EchelonService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carriere }) => {
      this.updateForm(carriere);

      this.echelonService
        .query({ filter: 'carriere-is-null' })
        .pipe(
          map((res: HttpResponse<IEchelon[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEchelon[]) => {
          if (!carriere.echelon || !carriere.echelon.id) {
            this.echelons = resBody;
          } else {
            this.echelonService
              .find(carriere.echelon.id)
              .pipe(
                map((subRes: HttpResponse<IEchelon>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEchelon[]) => (this.echelons = concatRes));
          }
        });

      this.classeService
        .query({ filter: 'carriere-is-null' })
        .pipe(
          map((res: HttpResponse<IClasse[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClasse[]) => {
          if (!carriere.classe || !carriere.classe.id) {
            this.classes = resBody;
          } else {
            this.classeService
              .find(carriere.classe.id)
              .pipe(
                map((subRes: HttpResponse<IClasse>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClasse[]) => (this.classes = concatRes));
          }
        });
    });
  }

  updateForm(carriere: ICarriere): void {
    this.editForm.patchValue({
      id: carriere.id,
      nom: carriere.nom,
      echelon: carriere.echelon,
      classe: carriere.classe
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
      echelon: this.editForm.get(['echelon'])!.value,
      classe: this.editForm.get(['classe'])!.value
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
