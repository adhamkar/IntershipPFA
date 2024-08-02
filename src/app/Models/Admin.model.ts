import { Genre } from "../Enums/Genre.enum";
import { Image } from "./Image.model";
import { User } from "./User.model";

export class Admin extends User {

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
    
  ) {
    super(id, nom, prenom, email, password, tel, ville, image, sexe);
    
  }
  }