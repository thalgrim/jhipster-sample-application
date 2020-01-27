import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICompetence, Competence } from 'app/shared/model/competence.model';
import { CompetenceService } from './competence.service';
import { CompetenceComponent } from './competence.component';
import { CompetenceDetailComponent } from './competence-detail.component';
import { CompetenceUpdateComponent } from './competence-update.component';

@Injectable({ providedIn: 'root' })
export class CompetenceResolve implements Resolve<ICompetence> {
  constructor(private service: CompetenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompetence> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((competence: HttpResponse<Competence>) => {
          if (competence.body) {
            return of(competence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Competence());
  }
}

export const competenceRoute: Routes = [
  {
    path: '',
    component: CompetenceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.competence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CompetenceDetailComponent,
    resolve: {
      competence: CompetenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.competence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CompetenceUpdateComponent,
    resolve: {
      competence: CompetenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.competence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CompetenceUpdateComponent,
    resolve: {
      competence: CompetenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.competence.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
