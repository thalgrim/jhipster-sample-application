import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CarriereUpdateComponent } from 'app/entities/carriere/carriere-update.component';
import { CarriereService } from 'app/entities/carriere/carriere.service';
import { Carriere } from 'app/shared/model/carriere.model';

describe('Component Tests', () => {
  describe('Carriere Management Update Component', () => {
    let comp: CarriereUpdateComponent;
    let fixture: ComponentFixture<CarriereUpdateComponent>;
    let service: CarriereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CarriereUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CarriereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarriereUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarriereService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Carriere(123);
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
        const entity = new Carriere();
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
