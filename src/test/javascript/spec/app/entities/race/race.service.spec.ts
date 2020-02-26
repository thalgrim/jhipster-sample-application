import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RaceService } from 'app/entities/race/race.service';
import { IRace, Race } from 'app/shared/model/race.model';

describe('Service Tests', () => {
  describe('Race Service', () => {
    let injector: TestBed;
    let service: RaceService;
    let httpMock: HttpTestingController;
    let elemDefault: IRace;
    let expectedResult: IRace | IRace[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RaceService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Race(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Race', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Race()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Race', () => {
        const returnedFromService = Object.assign(
          {
            cc: 1,
            ct: 1,
            fo: 1,
            en: 1,
            ini: 1,
            ag: 1,
            dex: 1,
            inte: 1,
            fm: 1,
            soc: 1,
            destin: 1,
            resilience: 1,
            experience: 1,
            mouvement: 1,
            pointsSuplementaires: 1,
            blessures: 1,
            nom: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Race', () => {
        const returnedFromService = Object.assign(
          {
            cc: 1,
            ct: 1,
            fo: 1,
            en: 1,
            ini: 1,
            ag: 1,
            dex: 1,
            inte: 1,
            fm: 1,
            soc: 1,
            destin: 1,
            resilience: 1,
            experience: 1,
            mouvement: 1,
            pointsSuplementaires: 1,
            blessures: 1,
            nom: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Race', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
