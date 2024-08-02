// src/app/models/bibliothecaire.model.ts
import { User } from './User.model';
import { Livre } from './Livre.model';
import { Genre } from '../Enums/Genre.enum';
import { Image } from './Image.model';

export class Bibliothecaire extends User {
  livres: Livre[];

  constructor(
    id: number,
    nom: string,
    prenom: string,
    email: string,
    password: string,
    tel: string,
    ville: string,
    image: Image,
    sexe: Genre,
    livres: Livre[]
  ) {
    super(id, nom, prenom, email, password, tel, ville, image, sexe);
    this.livres = livres;
  }
}
