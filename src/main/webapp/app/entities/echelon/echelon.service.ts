import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEchelon } from 'app/shared/model/echelon.model';

type EntityResponseType = HttpResponse<IEchelon>;
type EntityArrayResponseType = HttpResponse<IEchelon[]>;

@Injectable({ providedIn: 'root' })
export class EchelonService {
  public resourceUrl = SERVER_API_URL + 'api/echelons';

  constructor(protected http: HttpClient) {}

  create(echelon: IEchelon): Observable<EntityResponseType> {
    return this.http.post<IEchelon>(this.resourceUrl, echelon, { observe: 'response' });
  }

  update(echelon: IEchelon): Observable<EntityResponseType> {
    return this.http.put<IEchelon>(this.resourceUrl, echelon, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEchelon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEchelon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
