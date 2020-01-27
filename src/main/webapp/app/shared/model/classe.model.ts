import { IPossession } from 'app/shared/model/possession.model';
import { ICarriere } from 'app/shared/model/carriere.model';

export interface IClasse {
  id?: number;
  nom?: string;
  possessions?: IPossession[];
  carriere?: ICarriere;
}

export class Classe implements IClasse {
  constructor(public id?: number, public nom?: string, public possessions?: IPossession[], public carriere?: ICarriere) {}
}
