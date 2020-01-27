import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EchelonDetailComponent } from 'app/entities/echelon/echelon-detail.component';
import { Echelon } from 'app/shared/model/echelon.model';

describe('Component Tests', () => {
  describe('Echelon Management Detail Component', () => {
    let comp: EchelonDetailComponent;
    let fixture: ComponentFixture<EchelonDetailComponent>;
    const route = ({ data: of({ echelon: new Echelon(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EchelonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EchelonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EchelonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load echelon on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.echelon).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
