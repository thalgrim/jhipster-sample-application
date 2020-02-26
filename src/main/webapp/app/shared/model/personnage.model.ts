import { IRace } from 'app/shared/model/race.model';
import { ICarriere } from 'app/shared/model/carriere.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IPersonnage {
  id?: number;
  nom?: string;
  race?: IRace;
  carriere?: ICarriere;
  utilisateur?: IUtilisateur;
}

export class Personnage implements IPersonnage {
  constructor(
    public id?: number,
    public nom?: string,
    public race?: IRace,
    public carriere?: ICarriere,
    public utilisateur?: IUtilisateur
  ) {}
}
