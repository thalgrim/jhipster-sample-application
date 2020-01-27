import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { EchelonComponent } from './echelon.component';
import { EchelonDetailComponent } from './echelon-detail.component';
import { EchelonUpdateComponent } from './echelon-update.component';
import { EchelonDeleteDialogComponent } from './echelon-delete-dialog.component';
import { echelonRoute } from './echelon.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(echelonRoute)],
  declarations: [EchelonComponent, EchelonDetailComponent, EchelonUpdateComponent, EchelonDeleteDialogComponent],
  entryComponents: [EchelonDeleteDialogComponent]
})
export class JhipsterSampleApplicationEchelonModule {}
