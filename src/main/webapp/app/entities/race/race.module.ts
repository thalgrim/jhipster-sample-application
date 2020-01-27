import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { RaceComponent } from './race.component';
import { RaceDetailComponent } from './race-detail.component';
import { RaceUpdateComponent } from './race-update.component';
import { RaceDeleteDialogComponent } from './race-delete-dialog.component';
import { raceRoute } from './race.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(raceRoute)],
  declarations: [RaceComponent, RaceDetailComponent, RaceUpdateComponent, RaceDeleteDialogComponent],
  entryComponents: [RaceDeleteDialogComponent]
})
export class JhipsterSampleApplicationRaceModule {}
