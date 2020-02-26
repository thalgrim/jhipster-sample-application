import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PersonnageComponent } from 'app/entities/personnage/personnage.component';
import { PersonnageService } from 'app/entities/personnage/personnage.service';
import { Personnage } from 'app/shared/model/personnage.model';

describe('Component Tests', () => {
  describe('Personnage Management Component', () => {
    let comp: PersonnageComponent;
    let fixture: ComponentFixture<PersonnageComponent>;
    let service: PersonnageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PersonnageComponent]
      })
        .overrideTemplate(PersonnageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonnageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonnageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Personnage(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.personnages && comp.personnages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
