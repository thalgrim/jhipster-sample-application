import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarriere, Carriere } from 'app/shared/model/carriere.model';
import { CarriereService } from './carriere.service';
import { CarriereComponent } from './carriere.component';
import { CarriereDetailComponent } from './carriere-detail.component';
import { CarriereUpdateComponent } from './carriere-update.component';

@Injectable({ providedIn: 'root' })
export class CarriereResolve implements Resolve<ICarriere> {
  constructor(private service: CarriereService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarriere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carriere: HttpResponse<Carriere>) => {
          if (carriere.body) {
            return of(carriere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Carriere());
  }
}

export const carriereRoute: Routes = [
  {
    path: '',
    component: CarriereComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.carriere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarriereDetailComponent,
    resolve: {
      carriere: CarriereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.carriere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarriereUpdateComponent,
    resolve: {
      carriere: CarriereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.carriere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarriereUpdateComponent,
    resolve: {
      carriere: CarriereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.carriere.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
