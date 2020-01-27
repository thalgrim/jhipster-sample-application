import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPersonnage, Personnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from './personnage.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';

@Component({
  selector: 'jhi-personnage-update',
  templateUrl: './personnage-update.component.html'
})
export class PersonnageUpdateComponent implements OnInit {
  isSaving = false;

  utilisateurs: IUtilisateur[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    utilisateur: []
  });

  constructor(
    protected personnageService: PersonnageService,
    protected utilisateurService: UtilisateurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnage }) => {
      this.updateForm(personnage);

      this.utilisateurService
        .query()
        .pipe(
          map((res: HttpResponse<IUtilisateur[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUtilisateur[]) => (this.utilisateurs = resBody));
    });
  }

  updateForm(personnage: IPersonnage): void {
    this.editForm.patchValue({
      id: personnage.id,
      nom: personnage.nom,
      utilisateur: personnage.utilisateur
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personnage = this.createFromForm();
    if (personnage.id !== undefined) {
      this.subscribeToSaveResponse(this.personnageService.update(personnage));
    } else {
      this.subscribeToSaveResponse(this.personnageService.create(personnage));
    }
  }

  private createFromForm(): IPersonnage {
    return {
      ...new Personnage(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      utilisateur: this.editForm.get(['utilisateur'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonnage>>): void {
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

  trackById(index: number, item: IUtilisateur): any {
    return item.id;
  }
}
