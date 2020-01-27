import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { CarriereComponent } from './carriere.component';
import { CarriereDetailComponent } from './carriere-detail.component';
import { CarriereUpdateComponent } from './carriere-update.component';
import { CarriereDeleteDialogComponent } from './carriere-delete-dialog.component';
import { carriereRoute } from './carriere.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(carriereRoute)],
  declarations: [CarriereComponent, CarriereDetailComponent, CarriereUpdateComponent, CarriereDeleteDialogComponent],
  entryComponents: [CarriereDeleteDialogComponent]
})
export class JhipsterSampleApplicationCarriereModule {}
