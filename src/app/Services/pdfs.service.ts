import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PDFsService {
  private url = "http://localhost:8085/openpdf";

  constructor(private http: HttpClient) { }

  public getEtudiantsPDFs():Observable<any>  {
    return this.http.get<any>(`${this.url}`+"/etudiants");
  }
  public getLivresPDFs():Observable<any>  {
    return this.http.get<any>(`${this.url}`+"/livres");
  }
}
