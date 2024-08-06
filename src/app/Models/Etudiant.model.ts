import { Genre } from "../Enums/Genre.enum";
import { User } from "./User.model";
import { Comment } from "./Comment.model";
import { Emprunte } from "./Emprunt.model";
import { Reserve } from "./Reserve.model";
import { Image } from "./Image.model";
export class Etudiant extends User {
    blackListed: boolean;
    niveau: string;
    nationalite: string;
    filiere: string;
  cne: string;
  emprunts: Emprunte[];
  reservations: Reserve[];
  comments: Comment[];

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
    blackListed: boolean,
    niveau: string,
    nationalite: string,
    filiere: string,
    cne: string,
    emprunts: Emprunte[],
    reservations: Reserve[],
    comments: Comment[]
  ) {
    super(id, nom, prenom, email, password, tel, ville, image, sexe);
    this.blackListed = blackListed;
    this.cne = cne;
    this.emprunts = emprunts;
    this.reservations = reservations;
    this.comments = comments;
    this.niveau = niveau;
    this.nationalite = nationalite;
    this.filiere = filiere;
  }

  }