import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEchelon, Echelon } from 'app/shared/model/echelon.model';
import { EchelonService } from './echelon.service';
import { EchelonComponent } from './echelon.component';
import { EchelonDetailComponent } from './echelon-detail.component';
import { EchelonUpdateComponent } from './echelon-update.component';

@Injectable({ providedIn: 'root' })
export class EchelonResolve implements Resolve<IEchelon> {
  constructor(private service: EchelonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEchelon> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((echelon: HttpResponse<Echelon>) => {
          if (echelon.body) {
            return of(echelon.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Echelon());
  }
}

export const echelonRoute: Routes = [
  {
    path: '',
    component: EchelonComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.echelon.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EchelonDetailComponent,
    resolve: {
      echelon: EchelonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.echelon.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EchelonUpdateComponent,
    resolve: {
      echelon: EchelonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.echelon.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EchelonUpdateComponent,
    resolve: {
      echelon: EchelonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.echelon.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
