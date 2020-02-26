import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PossessionComponent } from 'app/entities/possession/possession.component';
import { PossessionService } from 'app/entities/possession/possession.service';
import { Possession } from 'app/shared/model/possession.model';

describe('Component Tests', () => {
  describe('Possession Management Component', () => {
    let comp: PossessionComponent;
    let fixture: ComponentFixture<PossessionComponent>;
    let service: PossessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PossessionComponent]
      })
        .overrideTemplate(PossessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PossessionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PossessionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Possession(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.possessions && comp.possessions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
