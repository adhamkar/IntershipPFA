import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emprunte } from '../Models/Emprunt.model';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  private url = "http://localhost:8085/bibliotecaire";
  constructor(private http: HttpClient) { }

  public getEmprunts(): Observable<Emprunte[]> {
    return this.http.get<Emprunte[]>(`${this.url}/emprunts`);
  }

}
