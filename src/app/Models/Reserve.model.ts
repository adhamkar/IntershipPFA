import { Livre } from './Livre.model';
import { Etudiant } from './Etudiant.model';

export class Reserve {
  id: number;
  dateReservation: Date;
  livre: Livre;
  etudiant: Etudiant;
  nomEtudiant: string;
  titreLivre: string;
  domaine: string;

  constructor(
    id: number,
    dateReservation: Date,
    livre: Livre,
    etudiant: Etudiant,
    nomEtudiant: string,
    titreLivre: string,
    domaine: string
  ) {
    this.id = id;
    this.dateReservation = dateReservation;
    this.livre = livre;
    this.etudiant = etudiant;
    this.nomEtudiant = nomEtudiant;
    this.titreLivre = titreLivre;
    this.domaine = domaine;
  }
}