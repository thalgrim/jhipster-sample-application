import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'possession',
        loadChildren: () => import('./possession/possession.module').then(m => m.JhipsterSampleApplicationPossessionModule)
      },
      {
        path: 'talent',
        loadChildren: () => import('./talent/talent.module').then(m => m.JhipsterSampleApplicationTalentModule)
      },
      {
        path: 'competence',
        loadChildren: () => import('./competence/competence.module').then(m => m.JhipsterSampleApplicationCompetenceModule)
      },
      {
        path: 'echelon',
        loadChildren: () => import('./echelon/echelon.module').then(m => m.JhipsterSampleApplicationEchelonModule)
      },
      {
        path: 'carriere',
        loadChildren: () => import('./carriere/carriere.module').then(m => m.JhipsterSampleApplicationCarriereModule)
      },
      {
        path: 'classe',
        loadChildren: () => import('./classe/classe.module').then(m => m.JhipsterSampleApplicationClasseModule)
      },
      {
        path: 'race',
        loadChildren: () => import('./race/race.module').then(m => m.JhipsterSampleApplicationRaceModule)
      },
      {
        path: 'personnage',
        loadChildren: () => import('./personnage/personnage.module').then(m => m.JhipsterSampleApplicationPersonnageModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.JhipsterSampleApplicationUtilisateurModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
