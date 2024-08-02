import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private url = "http://localhost:8085/bibliotecaire";
  private Etudianturl = "http://localhost:8085/etudiant";
  constructor(private http: HttpClient) { }
  
  public getLivres():Observable<Livre[]>  {
    return this.http.get<Livre[]>(`${this.url}`+"/livres");
  }
  public getCategoriesName():Observable<string[]>  {
    return this.http.get<string[]>(`${this.url}`+"/CategoriesNames");
  }
  public getNombreEmprunts(id:number):Observable<number>  {
    return this.http.get<number>(`${this.url}`+"/NombreEmpruntsParLivre/"+id);
  }
  public getInformatiqueLivres():Observable<Livre[]>  {
    return this.http.get<Livre[]>(`${this.Etudianturl}`+"/informatique/livres");
  }
  public getPhysiqueLivres():Observable<Livre[]>  {
    return this.http.get<Livre[]>(`${this.Etudianturl}`+"/physique/livres");
  }
  public getMathematiqueLivres():Observable<Livre[]>  {
    return this.http.get<Livre[]>(`${this.Etudianturl}`+"/mathematique/livres");
  }
}
