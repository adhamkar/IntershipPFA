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
  private BaseUrl = "http://localhost:8085/bibliotecaire";
  list:Livre[] = [];

  constructor(private http: HttpClient) { }

  public getCategories():Observable<Category[]> {
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
  public getCategoriesPage(page:number,size:number):Observable<any>  {
    return this.http.get<any>(`${this.url}/paginated/categories?page=${page}&size=${size}`);
  }

  public getInformatiqueCategories():Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.url}`+"/informatique/categories");
  }
  public getPhysiqueCategories():Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.url}`+"/physique/categories");
  }
  public getMathematiqueCategories():Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.url}`+"/mathematique/categories");
  }
  public DeleteCategoryById(id:number):Observable<any> {
    return this.http.delete(`${this.BaseUrl}/category/${id}`);
  }
  public updateCategory(category:Category,id:number):Observable<Category> {
    return this.http.patch<Category>(`${this.BaseUrl}/category/${id}`,category);
  }
}
