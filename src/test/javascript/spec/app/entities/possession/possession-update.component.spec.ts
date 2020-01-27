import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PossessionUpdateComponent } from 'app/entities/possession/possession-update.component';
import { PossessionService } from 'app/entities/possession/possession.service';
import { Possession } from 'app/shared/model/possession.model';

describe('Component Tests', () => {
  describe('Possession Management Update Component', () => {
    let comp: PossessionUpdateComponent;
    let fixture: ComponentFixture<PossessionUpdateComponent>;
    let service: PossessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PossessionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PossessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PossessionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PossessionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Possession(123);
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
        const entity = new Possession();
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
