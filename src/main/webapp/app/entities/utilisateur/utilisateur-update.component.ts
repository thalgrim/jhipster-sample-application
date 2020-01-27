import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUtilisateur, Utilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Component({
  selector: 'jhi-utilisateur-update',
  templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: []
  });

  constructor(protected utilisateurService: UtilisateurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.updateForm(utilisateur);
    });
  }

  updateForm(utilisateur: IUtilisateur): void {
    this.editForm.patchValue({
      id: utilisateur.id,
      nom: utilisateur.nom
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const utilisateur = this.createFromForm();
    if (utilisateur.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateurService.update(utilisateur));
    } else {
      this.subscribeToSaveResponse(this.utilisateurService.create(utilisateur));
    }
  }

  private createFromForm(): IUtilisateur {
    return {
      ...new Utilisateur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateur>>): void {
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
}
