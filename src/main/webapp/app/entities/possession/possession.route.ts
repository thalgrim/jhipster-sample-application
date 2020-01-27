import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPossession, Possession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';
import { PossessionComponent } from './possession.component';
import { PossessionDetailComponent } from './possession-detail.component';
import { PossessionUpdateComponent } from './possession-update.component';

@Injectable({ providedIn: 'root' })
export class PossessionResolve implements Resolve<IPossession> {
  constructor(private service: PossessionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPossession> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((possession: HttpResponse<Possession>) => {
          if (possession.body) {
            return of(possession.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Possession());
  }
}

export const possessionRoute: Routes = [
  {
    path: '',
    component: PossessionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.possession.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PossessionDetailComponent,
    resolve: {
      possession: PossessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.possession.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PossessionUpdateComponent,
    resolve: {
      possession: PossessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.possession.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PossessionUpdateComponent,
    resolve: {
      possession: PossessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.possession.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
