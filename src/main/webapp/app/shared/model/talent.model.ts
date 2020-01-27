import { IEchelon } from 'app/shared/model/echelon.model';

export interface ITalent {
  id?: number;
  nom?: string;
  maxi?: number;
  test?: string;
  description?: string;
  echelon?: IEchelon;
}

export class Talent implements ITalent {
  constructor(
    public id?: number,
    public nom?: string,
    public maxi?: number,
    public test?: string,
    public description?: string,
    public echelon?: IEchelon
  ) {}
}
