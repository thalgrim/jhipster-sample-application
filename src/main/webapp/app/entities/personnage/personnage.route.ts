import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonnage, Personnage } from 'app/shared/model/personnage.model';
import { PersonnageService } from './personnage.service';
import { PersonnageComponent } from './personnage.component';
import { PersonnageDetailComponent } from './personnage-detail.component';
import { PersonnageUpdateComponent } from './personnage-update.component';

@Injectable({ providedIn: 'root' })
export class PersonnageResolve implements Resolve<IPersonnage> {
  constructor(private service: PersonnageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonnage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personnage: HttpResponse<Personnage>) => {
          if (personnage.body) {
            return of(personnage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Personnage());
  }
}

export const personnageRoute: Routes = [
  {
    path: '',
    component: PersonnageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.personnage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PersonnageDetailComponent,
    resolve: {
      personnage: PersonnageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.personnage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PersonnageUpdateComponent,
    resolve: {
      personnage: PersonnageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.personnage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PersonnageUpdateComponent,
    resolve: {
      personnage: PersonnageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.personnage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
