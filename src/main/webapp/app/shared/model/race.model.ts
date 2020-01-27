import { IPersonnage } from 'app/shared/model/personnage.model';

export interface IRace {
  id?: number;
  cc?: number;
  ct?: number;
  fo?: number;
  en?: number;
  ini?: number;
  ag?: number;
  dex?: number;
  inte?: number;
  fm?: number;
  soc?: number;
  destin?: number;
  resilience?: number;
  experience?: number;
  mouvement?: number;
  pointsSuplementaires?: number;
  blessures?: number;
  nom?: string;
  personnage?: IPersonnage;
}

export class Race implements IRace {
  constructor(
    public id?: number,
    public cc?: number,
    public ct?: number,
    public fo?: number,
    public en?: number,
    public ini?: number,
    public ag?: number,
    public dex?: number,
    public inte?: number,
    public fm?: number,
    public soc?: number,
    public destin?: number,
    public resilience?: number,
    public experience?: number,
    public mouvement?: number,
    public pointsSuplementaires?: number,
    public blessures?: number,
    public nom?: string,
    public personnage?: IPersonnage
  ) {}
}
