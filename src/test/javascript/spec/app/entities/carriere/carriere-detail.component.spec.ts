import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CarriereDetailComponent } from 'app/entities/carriere/carriere-detail.component';
import { Carriere } from 'app/shared/model/carriere.model';

describe('Component Tests', () => {
  describe('Carriere Management Detail Component', () => {
    let comp: CarriereDetailComponent;
    let fixture: ComponentFixture<CarriereDetailComponent>;
    const route = ({ data: of({ carriere: new Carriere(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CarriereDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CarriereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarriereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load carriere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.carriere).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
