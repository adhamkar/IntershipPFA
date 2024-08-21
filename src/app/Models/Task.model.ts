import { Etudiant } from "./Etudiant.model";

export class Task{
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  completed: boolean;
  etudiant: Etudiant;

  constructor( id: number,
    title: string,
    description: string,
    startDateTime: Date,
    endDateTime: Date,
    completed: boolean,
    etudiant: Etudiant){
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.completed = completed;
    this.etudiant = etudiant;
    }
}