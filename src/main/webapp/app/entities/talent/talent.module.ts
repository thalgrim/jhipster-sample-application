import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { TalentComponent } from './talent.component';
import { TalentDetailComponent } from './talent-detail.component';
import { TalentUpdateComponent } from './talent-update.component';
import { TalentDeleteDialogComponent } from './talent-delete-dialog.component';
import { talentRoute } from './talent.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(talentRoute)],
  declarations: [TalentComponent, TalentDetailComponent, TalentUpdateComponent, TalentDeleteDialogComponent],
  entryComponents: [TalentDeleteDialogComponent]
})
export class JhipsterSampleApplicationTalentModule {}
