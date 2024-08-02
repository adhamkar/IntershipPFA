import { Category } from "./Category.model";
import { Comment } from "./Comment.model";
import { Emprunte } from "./Emprunt.model";
import { Reserve } from "./Reserve.model";
import { Bibliothecaire } from "./Bibliothecaire.model";
import { EtatLivre } from "../Enums/EtatLivre.enum";
import { Image } from "./Image.model";

export class Livre {
    id: number;
    quantite: number;
    titre: string;
    auteur: string;
    description: string;
    image: Image;
    disponibilite: EtatLivre;
    dateSortie: Date;
    category: Category;
    bibliothecaire: Bibliothecaire;
    emprunts: Emprunte[];
    reservations: Reserve[];
    comments: Comment[];
  
    constructor(
      id: number,
      quantite: number,
      titre: string,
      auteur: string,
      description: string,
      image: Image,
      disponibilite: EtatLivre,
      dateSortie: Date,
      category: Category,
      bibliothecaire: Bibliothecaire,
      emprunts: Emprunte[],
      reservations: Reserve[],
      comments: Comment[]
    ) {
      this.id = id;
      this.quantite = quantite;
      this.titre = titre;
      this.auteur = auteur;
      this.description = description;
      this.image = image;
      this.disponibilite = disponibilite;
      this.dateSortie = dateSortie;
      this.category = category;
      this.bibliothecaire = bibliothecaire;
      this.emprunts = emprunts;
      this.reservations = reservations;
      this.comments = comments;
    }

    public NombreEmprunts():number{
      return this.emprunts.length;
    }
  }