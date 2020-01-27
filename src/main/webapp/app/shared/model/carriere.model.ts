import { IEchelon } from 'app/shared/model/echelon.model';
import { IClasse } from 'app/shared/model/classe.model';
import { IPersonnage } from 'app/shared/model/personnage.model';

export interface ICarriere {
  id?: number;
  nom?: string;
  echelons?: IEchelon[];
  classes?: IClasse[];
  personnage?: IPersonnage;
}

export class Carriere implements ICarriere {
  constructor(
    public id?: number,
    public nom?: string,
    public echelons?: IEchelon[],
    public classes?: IClasse[],
    public personnage?: IPersonnage
  ) {}
}
