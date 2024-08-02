// src/app/models/emprunte.model.ts
import { EmpruntStatus } from './../Enums/EmpruntStatus.enum';
import { Livre } from './Livre.model';
import { Etudiant } from './Etudiant.model';

export class Emprunte {
  id: number;
  status: EmpruntStatus;
  dateEmprunt: Date;
  dateRetour: Date;
  livre: Livre;
  etudiant: Etudiant;
  nomEtudiant: string;
  titreLivre: string;
  domaine: string;

  constructor(
    id: number,
    status: EmpruntStatus,
    dateEmprunt: Date,
    dateRetour: Date,
    livre: Livre,
    etudiant: Etudiant,
    nomEtudiant: string,
    titreLivre: string,
    domaine: string
  ) {
    this.id = id;
    this.status = status;
    this.dateEmprunt = dateEmprunt;
    this.dateRetour = dateRetour;
    this.livre = livre;
    this.etudiant = etudiant;
    this.nomEtudiant = nomEtudiant;
    this.titreLivre = titreLivre;
    this.domaine = domaine;
  }
}
