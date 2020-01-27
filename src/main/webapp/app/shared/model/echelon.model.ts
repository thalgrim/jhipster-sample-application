import { ICompetence } from 'app/shared/model/competence.model';
import { ITalent } from 'app/shared/model/talent.model';
import { IPossession } from 'app/shared/model/possession.model';
import { ICarriere } from 'app/shared/model/carriere.model';

export interface IEchelon {
  id?: number;
  nom?: string;
  niveau?: number;
  cc?: boolean;
  ct?: boolean;
  fo?: boolean;
  en?: boolean;
  ini?: boolean;
  ag?: boolean;
  dex?: boolean;
  inte?: boolean;
  fm?: boolean;
  soc?: boolean;
  statut?: string;
  competences?: ICompetence[];
  talents?: ITalent[];
  possessions?: IPossession[];
  carriere?: ICarriere;
}

export class Echelon implements IEchelon {
  constructor(
    public id?: number,
    public nom?: string,
    public niveau?: number,
    public cc?: boolean,
    public ct?: boolean,
    public fo?: boolean,
    public en?: boolean,
    public ini?: boolean,
    public ag?: boolean,
    public dex?: boolean,
    public inte?: boolean,
    public fm?: boolean,
    public soc?: boolean,
    public statut?: string,
    public competences?: ICompetence[],
    public talents?: ITalent[],
    public possessions?: IPossession[],
    public carriere?: ICarriere
  ) {
    this.cc = this.cc || false;
    this.ct = this.ct || false;
    this.fo = this.fo || false;
    this.en = this.en || false;
    this.ini = this.ini || false;
    this.ag = this.ag || false;
    this.dex = this.dex || false;
    this.inte = this.inte || false;
    this.fm = this.fm || false;
    this.soc = this.soc || false;
  }
}
