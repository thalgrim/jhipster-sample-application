import { IEchelon } from 'app/shared/model/echelon.model';
import { IClasse } from 'app/shared/model/classe.model';

export interface IPossession {
  id?: number;
  nom?: string;
  echelon?: IEchelon;
  classe?: IClasse;
}

export class Possession implements IPossession {
  constructor(public id?: number, public nom?: string, public echelon?: IEchelon, public classe?: IClasse) {}
}
