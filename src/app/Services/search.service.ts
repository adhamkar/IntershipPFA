import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';
import { Etudiant } from '../Models/Etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = "http://localhost:8085/search";
  constructor(private http: HttpClient) { }

  searchLivres(query: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}/books?search=${query}`);
  }
  searchEtudiants(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}/students?search=${query}`);
  }
searchcategories(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}/categories?search=${query}`);
  }
  searchEmprunte(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}/emprunts?search=${query}`);
  }
}
