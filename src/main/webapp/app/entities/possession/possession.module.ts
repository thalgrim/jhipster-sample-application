import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PossessionComponent } from './possession.component';
import { PossessionDetailComponent } from './possession-detail.component';
import { PossessionUpdateComponent } from './possession-update.component';
import { PossessionDeleteDialogComponent } from './possession-delete-dialog.component';
import { possessionRoute } from './possession.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(possessionRoute)],
  declarations: [PossessionComponent, PossessionDetailComponent, PossessionUpdateComponent, PossessionDeleteDialogComponent],
  entryComponents: [PossessionDeleteDialogComponent]
})
export class JhipsterSampleApplicationPossessionModule {}
