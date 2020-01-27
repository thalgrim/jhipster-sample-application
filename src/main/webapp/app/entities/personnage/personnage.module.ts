import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PersonnageComponent } from './personnage.component';
import { PersonnageDetailComponent } from './personnage-detail.component';
import { PersonnageUpdateComponent } from './personnage-update.component';
import { PersonnageDeleteDialogComponent } from './personnage-delete-dialog.component';
import { personnageRoute } from './personnage.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(personnageRoute)],
  declarations: [PersonnageComponent, PersonnageDetailComponent, PersonnageUpdateComponent, PersonnageDeleteDialogComponent],
  entryComponents: [PersonnageDeleteDialogComponent]
})
export class JhipsterSampleApplicationPersonnageModule {}
