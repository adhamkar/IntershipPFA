import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/Etudiant.model';
import { Image } from '../Models/Image.model';
import { Category } from '../Models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class AjouterService {
  private url = "http://localhost:8085/admin";
  private imageApiUrl = 'http://localhost:8085/image';
  private Caturl = "http://localhost:8085/bibliotecaire";

  constructor(private http: HttpClient) { }
  
  public addEtdudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.url}`+"/etudiant", etudiant);
}
public addCategory(category:Category): Observable<Category> {
  return this.http.post<Category>(`${this.Caturl}`+"/category", category);
}

  public addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(`${this.imageApiUrl}`, image);
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<any>(this.imageApiUrl, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
 deleteLastImage(): Observable<any> {
  return this.http.delete<any>(`${this.imageApiUrl}`+"/lastImage");
 }

}
