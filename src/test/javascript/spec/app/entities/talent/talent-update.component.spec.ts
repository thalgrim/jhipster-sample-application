import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TalentUpdateComponent } from 'app/entities/talent/talent-update.component';
import { TalentService } from 'app/entities/talent/talent.service';
import { Talent } from 'app/shared/model/talent.model';

describe('Component Tests', () => {
  describe('Talent Management Update Component', () => {
    let comp: TalentUpdateComponent;
    let fixture: ComponentFixture<TalentUpdateComponent>;
    let service: TalentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TalentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TalentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TalentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Talent(123);
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
        const entity = new Talent();
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
