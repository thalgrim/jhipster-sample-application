import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PersonnageUpdateComponent } from 'app/entities/personnage/personnage-update.component';
import { PersonnageService } from 'app/entities/personnage/personnage.service';
import { Personnage } from 'app/shared/model/personnage.model';

describe('Component Tests', () => {
  describe('Personnage Management Update Component', () => {
    let comp: PersonnageUpdateComponent;
    let fixture: ComponentFixture<PersonnageUpdateComponent>;
    let service: PersonnageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PersonnageUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PersonnageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonnageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonnageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personnage(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personnage();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
