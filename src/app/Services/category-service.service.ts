import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/Category.model';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private url = "http://localhost:8085/etudiant";
  private baseUrl="http://localhost:8085/bibliotecaire";
  list:Livre[] = [];

  constructor(private http: HttpClient) { }

  public getCategories():Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.url}`+"/categories");
  }

  public getDomaines():Observable<String[]>  {
    return this.http.get<String[]>(`${this.url}`+"/categories/domaines");
  }
  public getLivresBySousDomaines(sousDomaine:string):Observable<Livre[]>{
    return this.http.get<Livre[]>(`${this.url}`+"/livres/"+sousDomaine);
  }
  
  public getBooksByCategory(id:number):Observable<Livre[]>{
    return this.http.get<Livre[]>(`${this.url}`+"/livres/category/"+id);
  }
  public getBooksNUmberBySD(sous_domaine:string):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}`+"/livres/number"+sous_domaine);
  }
}
