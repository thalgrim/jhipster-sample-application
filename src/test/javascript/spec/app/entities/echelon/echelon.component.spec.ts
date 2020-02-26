import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EchelonComponent } from 'app/entities/echelon/echelon.component';
import { EchelonService } from 'app/entities/echelon/echelon.service';
import { Echelon } from 'app/shared/model/echelon.model';

describe('Component Tests', () => {
  describe('Echelon Management Component', () => {
    let comp: EchelonComponent;
    let fixture: ComponentFixture<EchelonComponent>;
    let service: EchelonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EchelonComponent]
      })
        .overrideTemplate(EchelonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EchelonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EchelonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Echelon(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.echelons && comp.echelons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
