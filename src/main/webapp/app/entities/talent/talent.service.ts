import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITalent } from 'app/shared/model/talent.model';

type EntityResponseType = HttpResponse<ITalent>;
type EntityArrayResponseType = HttpResponse<ITalent[]>;

@Injectable({ providedIn: 'root' })
export class TalentService {
  public resourceUrl = SERVER_API_URL + 'api/talents';

  constructor(protected http: HttpClient) {}

  create(talent: ITalent): Observable<EntityResponseType> {
    return this.http.post<ITalent>(this.resourceUrl, talent, { observe: 'response' });
  }

  update(talent: ITalent): Observable<EntityResponseType> {
    return this.http.put<ITalent>(this.resourceUrl, talent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITalent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITalent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
