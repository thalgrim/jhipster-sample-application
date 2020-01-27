import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PossessionDetailComponent } from 'app/entities/possession/possession-detail.component';
import { Possession } from 'app/shared/model/possession.model';

describe('Component Tests', () => {
  describe('Possession Management Detail Component', () => {
    let comp: PossessionDetailComponent;
    let fixture: ComponentFixture<PossessionDetailComponent>;
    const route = ({ data: of({ possession: new Possession(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PossessionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PossessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PossessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load possession on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.possession).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
