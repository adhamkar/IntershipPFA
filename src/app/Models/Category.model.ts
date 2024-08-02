import { Image } from './Image.model';
import { Livre } from './Livre.model';

export class Category {
    id: number;
    domaine: string;
    sous_domaine: string;
    livres: Livre[];
    image: Image;

    constructor(id: number, domaine: string, sous_domaine: string, livres: Livre[], image: Image) {
        this.id = id;
        this.domaine = domaine;
        this.sous_domaine = sous_domaine;
        this.livres = livres;
        this.image = image;
    }
}
