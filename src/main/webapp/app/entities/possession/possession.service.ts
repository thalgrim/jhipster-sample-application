import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPossession } from 'app/shared/model/possession.model';

type EntityResponseType = HttpResponse<IPossession>;
type EntityArrayResponseType = HttpResponse<IPossession[]>;

@Injectable({ providedIn: 'root' })
export class PossessionService {
  public resourceUrl = SERVER_API_URL + 'api/possessions';

  constructor(protected http: HttpClient) {}

  create(possession: IPossession): Observable<EntityResponseType> {
    return this.http.post<IPossession>(this.resourceUrl, possession, { observe: 'response' });
  }

  update(possession: IPossession): Observable<EntityResponseType> {
    return this.http.put<IPossession>(this.resourceUrl, possession, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPossession>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPossession[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
