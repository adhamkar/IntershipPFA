// src/app/models/comment.model.ts
import { Etudiant } from './Etudiant.model';
import { Livre } from './Livre.model';

export class Comment {
  id: number;
  commentaire: string;
  createdDate: Date;
  etudiant: Etudiant;
  livre: Livre;

  constructor(
    id: number,
    commentaire: string,
    createdDate: Date,
    etudiant: Etudiant,
    livre: Livre
  ) {
    this.id = id;
    this.commentaire = commentaire;
    this.createdDate = createdDate;
    this.etudiant = etudiant;
    this.livre = livre;
  }
}
