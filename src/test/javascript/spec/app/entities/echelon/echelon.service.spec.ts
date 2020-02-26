import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EchelonService } from 'app/entities/echelon/echelon.service';
import { IEchelon, Echelon } from 'app/shared/model/echelon.model';

describe('Service Tests', () => {
  describe('Echelon Service', () => {
    let injector: TestBed;
    let service: EchelonService;
    let httpMock: HttpTestingController;
    let elemDefault: IEchelon;
    let expectedResult: IEchelon | IEchelon[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EchelonService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Echelon(0, 'AAAAAAA', 0, false, false, false, false, false, false, false, false, false, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Echelon', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Echelon()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Echelon', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            niveau: 1,
            cc: true,
            ct: true,
            fo: true,
            en: true,
            ini: true,
            ag: true,
            dex: true,
            inte: true,
            fm: true,
            soc: true,
            statut: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Echelon', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            niveau: 1,
            cc: true,
            ct: true,
            fo: true,
            en: true,
            ini: true,
            ag: true,
            dex: true,
            inte: true,
            fm: true,
            soc: true,
            statut: 'BBBBBB'
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

      it('should delete a Echelon', () => {
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
