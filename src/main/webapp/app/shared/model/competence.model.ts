import { IEchelon } from 'app/shared/model/echelon.model';

export interface ICompetence {
  id?: number;
  nom?: string;
  caracteristique?: string;
  deBase?: boolean;
  groupee?: boolean;
  echelon?: IEchelon;
}

export class Competence implements ICompetence {
  constructor(
    public id?: number,
    public nom?: string,
    public caracteristique?: string,
    public deBase?: boolean,
    public groupee?: boolean,
    public echelon?: IEchelon
  ) {
    this.deBase = this.deBase || false;
    this.groupee = this.groupee || false;
  }
}
