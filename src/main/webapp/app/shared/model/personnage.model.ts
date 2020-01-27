import { IRace } from 'app/shared/model/race.model';
import { ICarriere } from 'app/shared/model/carriere.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IPersonnage {
  id?: number;
  nom?: string;
  races?: IRace[];
  carrieres?: ICarriere[];
  utilisateur?: IUtilisateur;
}

export class Personnage implements IPersonnage {
  constructor(
    public id?: number,
    public nom?: string,
    public races?: IRace[],
    public carrieres?: ICarriere[],
    public utilisateur?: IUtilisateur
  ) {}
}
