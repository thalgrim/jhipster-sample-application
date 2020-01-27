import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EchelonUpdateComponent } from 'app/entities/echelon/echelon-update.component';
import { EchelonService } from 'app/entities/echelon/echelon.service';
import { Echelon } from 'app/shared/model/echelon.model';

describe('Component Tests', () => {
  describe('Echelon Management Update Component', () => {
    let comp: EchelonUpdateComponent;
    let fixture: ComponentFixture<EchelonUpdateComponent>;
    let service: EchelonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EchelonUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EchelonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EchelonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EchelonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Echelon(123);
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
        const entity = new Echelon();
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
