import { IPersonnage } from 'app/shared/model/personnage.model';

export interface IUtilisateur {
  id?: number;
  nom?: string;
  personnages?: IPersonnage[];
}

export class Utilisateur implements IUtilisateur {
  constructor(public id?: number, public nom?: string, public personnages?: IPersonnage[]) {}
}
