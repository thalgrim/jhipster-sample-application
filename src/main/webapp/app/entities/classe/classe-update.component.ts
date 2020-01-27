import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClasse, Classe } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';
import { ICarriere } from 'app/shared/model/carriere.model';
import { CarriereService } from 'app/entities/carriere/carriere.service';

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html'
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;

  carrieres: ICarriere[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    carriere: []
  });

  constructor(
    protected classeService: ClasseService,
    protected carriereService: CarriereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.updateForm(classe);

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

  updateForm(classe: IClasse): void {
    this.editForm.patchValue({
      id: classe.id,
      nom: classe.nom,
      carriere: classe.carriere
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classe = this.createFromForm();
    if (classe.id !== undefined) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  private createFromForm(): IClasse {
    return {
      ...new Classe(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      carriere: this.editForm.get(['carriere'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>): void {
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
