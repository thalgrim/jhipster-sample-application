import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TalentDetailComponent } from 'app/entities/talent/talent-detail.component';
import { Talent } from 'app/shared/model/talent.model';

describe('Component Tests', () => {
  describe('Talent Management Detail Component', () => {
    let comp: TalentDetailComponent;
    let fixture: ComponentFixture<TalentDetailComponent>;
    const route = ({ data: of({ talent: new Talent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TalentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TalentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TalentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load talent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.talent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
