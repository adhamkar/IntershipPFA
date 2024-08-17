import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/Category.model';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';
import { Bibliothecaire } from '../Models/Bibliothecaire.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BaseUrl = "http://localhost:8085/bibliotecaire";
  private AdminUrl = "http://localhost:8085/admin";

  constructor(private http: HttpClient) { }

  public updateBookCategory(livre: Livre,domain:string,sousDomaine:string): Observable<Livre> {
    return this.http.patch<Livre>(`${this.BaseUrl}`+"/addedBook/"+domain+"/"+sousDomaine, livre);
  }
  public addBook(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(`${this.BaseUrl}`+"/livre", livre);
  }
  public getAllBibliothecaire(): Observable<Bibliothecaire[]> {
    return this.http.get<Bibliothecaire[]>(`${this.AdminUrl}`+"/bibliothecaires");
  }
  public deleteBook(id: number): Observable<Livre> {
    return this.http.delete<Livre>(`${this.BaseUrl}`+"/livre/"+id);
  }
}
