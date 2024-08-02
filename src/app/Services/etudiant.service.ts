import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/Etudiant.model';
import { Image } from '../Models/Image.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private url = "http://localhost:8085/admin";
  private imageApiUrl = 'http://localhost:8085/image/';

  constructor(private http: HttpClient) { }
  
  public getEtudiants():Observable<Etudiant[]>  {
    return this.http.get<Etudiant[]>(`${this.url}`+"/etudiants");
  }
  public getImageUrl(fileName: string): string {
    return `${this.imageApiUrl+'/name'}${fileName}`;
  }
  getImage(fileName: string): Observable<Blob> {
    return this.http.get(`${this.imageApiUrl}name/${fileName}`, { responseType: 'blob' });
  }

  public getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.imageApiUrl}`+"images");
  }

  public deleteEtudiant(id: number): Observable<Etudiant[]> {
    return this.http.delete<Etudiant[]>(`${this.url}/etudiant/${id}`);
  }
}
