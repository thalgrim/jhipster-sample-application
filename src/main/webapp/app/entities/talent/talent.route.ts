import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITalent, Talent } from 'app/shared/model/talent.model';
import { TalentService } from './talent.service';
import { TalentComponent } from './talent.component';
import { TalentDetailComponent } from './talent-detail.component';
import { TalentUpdateComponent } from './talent-update.component';

@Injectable({ providedIn: 'root' })
export class TalentResolve implements Resolve<ITalent> {
  constructor(private service: TalentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITalent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((talent: HttpResponse<Talent>) => {
          if (talent.body) {
            return of(talent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Talent());
  }
}

export const talentRoute: Routes = [
  {
    path: '',
    component: TalentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.talent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TalentDetailComponent,
    resolve: {
      talent: TalentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.talent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TalentUpdateComponent,
    resolve: {
      talent: TalentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.talent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TalentUpdateComponent,
    resolve: {
      talent: TalentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.talent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
