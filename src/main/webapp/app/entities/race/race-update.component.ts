import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRace, Race } from 'app/shared/model/race.model';
import { RaceService } from './race.service';
import { IPersonnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from 'app/entities/personnage/personnage.service';

@Component({
  selector: 'jhi-race-update',
  templateUrl: './race-update.component.html'
})
export class RaceUpdateComponent implements OnInit {
  isSaving = false;

  personnages: IPersonnage[] = [];

  editForm = this.fb.group({
    id: [],
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
    destin: [],
    resilience: [],
    experience: [],
    mouvement: [],
    pointsSuplementaires: [],
    blessures: [],
    nom: [],
    personnage: []
  });

  constructor(
    protected raceService: RaceService,
    protected personnageService: PersonnageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ race }) => {
      this.updateForm(race);

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

  updateForm(race: IRace): void {
    this.editForm.patchValue({
      id: race.id,
      cc: race.cc,
      ct: race.ct,
      fo: race.fo,
      en: race.en,
      ini: race.ini,
      ag: race.ag,
      dex: race.dex,
      inte: race.inte,
      fm: race.fm,
      soc: race.soc,
      destin: race.destin,
      resilience: race.resilience,
      experience: race.experience,
      mouvement: race.mouvement,
      pointsSuplementaires: race.pointsSuplementaires,
      blessures: race.blessures,
      nom: race.nom,
      personnage: race.personnage
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const race = this.createFromForm();
    if (race.id !== undefined) {
      this.subscribeToSaveResponse(this.raceService.update(race));
    } else {
      this.subscribeToSaveResponse(this.raceService.create(race));
    }
  }

  private createFromForm(): IRace {
    return {
      ...new Race(),
      id: this.editForm.get(['id'])!.value,
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
      destin: this.editForm.get(['destin'])!.value,
      resilience: this.editForm.get(['resilience'])!.value,
      experience: this.editForm.get(['experience'])!.value,
      mouvement: this.editForm.get(['mouvement'])!.value,
      pointsSuplementaires: this.editForm.get(['pointsSuplementaires'])!.value,
      blessures: this.editForm.get(['blessures'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      personnage: this.editForm.get(['personnage'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRace>>): void {
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
