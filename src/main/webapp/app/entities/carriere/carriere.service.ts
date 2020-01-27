import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICarriere } from 'app/shared/model/carriere.model';

type EntityResponseType = HttpResponse<ICarriere>;
type EntityArrayResponseType = HttpResponse<ICarriere[]>;

@Injectable({ providedIn: 'root' })
export class CarriereService {
  public resourceUrl = SERVER_API_URL + 'api/carrieres';

  constructor(protected http: HttpClient) {}

  create(carriere: ICarriere): Observable<EntityResponseType> {
    return this.http.post<ICarriere>(this.resourceUrl, carriere, { observe: 'response' });
  }

  update(carriere: ICarriere): Observable<EntityResponseType> {
    return this.http.put<ICarriere>(this.resourceUrl, carriere, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICarriere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICarriere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
