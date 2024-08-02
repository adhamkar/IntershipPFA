import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../Models/Livre.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = "http://localhost:8085/search/books";
  constructor(private http: HttpClient) { }

  searchLivres(query: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}?search=${query}`);
  }

}
