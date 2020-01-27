import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PersonnageDetailComponent } from 'app/entities/personnage/personnage-detail.component';
import { Personnage } from 'app/shared/model/personnage.model';

describe('Component Tests', () => {
  describe('Personnage Management Detail Component', () => {
    let comp: PersonnageDetailComponent;
    let fixture: ComponentFixture<PersonnageDetailComponent>;
    const route = ({ data: of({ personnage: new Personnage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PersonnageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PersonnageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonnageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personnage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personnage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
