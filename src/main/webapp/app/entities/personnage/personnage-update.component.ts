import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPersonnage, Personnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from './personnage.service';
import { IRace } from 'app/shared/model/race.model';
import { RaceService } from 'app/entities/race/race.service';
import { ICarriere } from 'app/shared/model/carriere.model';
import { CarriereService } from 'app/entities/carriere/carriere.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';

type SelectableEntity = IRace | ICarriere | IUtilisateur;

@Component({
  selector: 'jhi-personnage-update',
  templateUrl: './personnage-update.component.html'
})
export class PersonnageUpdateComponent implements OnInit {
  isSaving = false;
  races: IRace[] = [];
  carrieres: ICarriere[] = [];
  utilisateurs: IUtilisateur[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    race: [],
    carriere: [],
    utilisateur: []
  });

  constructor(
    protected personnageService: PersonnageService,
    protected raceService: RaceService,
    protected carriereService: CarriereService,
    protected utilisateurService: UtilisateurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnage }) => {
      this.updateForm(personnage);

      this.raceService
        .query({ filter: 'personnage-is-null' })
        .pipe(
          map((res: HttpResponse<IRace[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRace[]) => {
          if (!personnage.race || !personnage.race.id) {
            this.races = resBody;
          } else {
            this.raceService
              .find(personnage.race.id)
              .pipe(
                map((subRes: HttpResponse<IRace>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRace[]) => (this.races = concatRes));
          }
        });

      this.carriereService
        .query({ filter: 'personnage-is-null' })
        .pipe(
          map((res: HttpResponse<ICarriere[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICarriere[]) => {
          if (!personnage.carriere || !personnage.carriere.id) {
            this.carrieres = resBody;
          } else {
            this.carriereService
              .find(personnage.carriere.id)
              .pipe(
                map((subRes: HttpResponse<ICarriere>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICarriere[]) => (this.carrieres = concatRes));
          }
        });

      this.utilisateurService.query().subscribe((res: HttpResponse<IUtilisateur[]>) => (this.utilisateurs = res.body || []));
    });
  }

  updateForm(personnage: IPersonnage): void {
    this.editForm.patchValue({
      id: personnage.id,
      nom: personnage.nom,
      race: personnage.race,
      carriere: personnage.carriere,
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
      race: this.editForm.get(['race'])!.value,
      carriere: this.editForm.get(['carriere'])!.value,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
