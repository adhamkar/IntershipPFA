import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';
import { Comment } from '../Models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private url = "http://localhost:8085/bibliotecaire";
  private Etudianturl = "http://localhost:8085/etudiant";
  private adminUrl = "http://localhost:8085/admin";
  constructor(private http: HttpClient) { }

  public getLivresPage(page:number,size:number):Observable<any>  {
    return this.http.get<any>(`${this.Etudianturl}/paginated?page=${page}&size=${size}`);
  }
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
  public deleteLivre(id:number):Observable<any>  {
    return this.http.delete(`${this.url}/livre/${id}`);
  }
  public updateBook(livre:Livre,id:number):Observable<Livre>  {
    return this.http.patch<Livre>(`${this.url}/livre/${id}`,livre);
  }
  public getlivreComments(id:number):Observable<Comment[]>  {
    return this.http.get<Comment[]>(`${this.adminUrl}/livre/${id}/comment`);
  }
  
}
