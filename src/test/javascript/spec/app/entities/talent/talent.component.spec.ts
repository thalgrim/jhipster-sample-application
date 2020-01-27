import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TalentComponent } from 'app/entities/talent/talent.component';
import { TalentService } from 'app/entities/talent/talent.service';
import { Talent } from 'app/shared/model/talent.model';

describe('Component Tests', () => {
  describe('Talent Management Component', () => {
    let comp: TalentComponent;
    let fixture: ComponentFixture<TalentComponent>;
    let service: TalentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TalentComponent],
        providers: []
      })
        .overrideTemplate(TalentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TalentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Talent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.talents && comp.talents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
