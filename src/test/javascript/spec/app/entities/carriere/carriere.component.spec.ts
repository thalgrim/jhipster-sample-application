import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CarriereComponent } from 'app/entities/carriere/carriere.component';
import { CarriereService } from 'app/entities/carriere/carriere.service';
import { Carriere } from 'app/shared/model/carriere.model';

describe('Component Tests', () => {
  describe('Carriere Management Component', () => {
    let comp: CarriereComponent;
    let fixture: ComponentFixture<CarriereComponent>;
    let service: CarriereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CarriereComponent]
      })
        .overrideTemplate(CarriereComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarriereComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarriereService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Carriere(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.carrieres && comp.carrieres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
