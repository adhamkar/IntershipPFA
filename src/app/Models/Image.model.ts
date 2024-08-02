import { Category } from "./Category.model";
import { Livre } from "./Livre.model";
import { User } from "./User.model";

export class Image {
    id: number;
    name: string;
    type: string;
    imageData: string;
    livres: Livre[];
    users: User[];
    categories: Category[];

    constructor(
        id: number,
        name: string,
        type: string,
        livres: Livre[],
        users: User[],
        categories: Category[],
        imageData: string
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.livres = livres;
        this.users = users;
        this.categories = categories;
        this.imageData = imageData;
    }

    getImageDataUrl(): string {
        return `data:${this.type};base64,${this.imageData}`;
      }
}