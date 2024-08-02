import { Genre } from '../Enums/Genre.enum';
import { Image } from './Image.model';

export class User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  tel: string;
  ville: string;
  image: Image;
  sexe: Genre;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    email: string,
    password: string,
    tel: string,
    ville: string,
    image: Image,
    sexe: Genre
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.tel = tel;
    this.ville = ville;
    this.image = image;
    this.sexe = sexe;
  }
}