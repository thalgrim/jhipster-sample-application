import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRace, Race } from 'app/shared/model/race.model';
import { RaceService } from './race.service';
import { RaceComponent } from './race.component';
import { RaceDetailComponent } from './race-detail.component';
import { RaceUpdateComponent } from './race-update.component';

@Injectable({ providedIn: 'root' })
export class RaceResolve implements Resolve<IRace> {
  constructor(private service: RaceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRace> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((race: HttpResponse<Race>) => {
          if (race.body) {
            return of(race.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Race());
  }
}

export const raceRoute: Routes = [
  {
    path: '',
    component: RaceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.race.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RaceDetailComponent,
    resolve: {
      race: RaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.race.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RaceUpdateComponent,
    resolve: {
      race: RaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.race.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RaceUpdateComponent,
    resolve: {
      race: RaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.race.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
