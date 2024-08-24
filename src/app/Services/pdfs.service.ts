import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PDFsService {
  private url = "http://localhost:8085/openpdf";



  constructor(private http: HttpClient,private authService: AuthService) {}
  getEtudiantPdf(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken, 
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.url}`+"/etudiants", { headers: headers, responseType: 'blob' });
  }

  
 getLivresPdf(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken, 
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.url}`+"/livres", { headers: headers, responseType: 'blob' });
 }

  public getEmpruntPDFs(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken, 
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.url}`+"/emprunts", { headers: headers, responseType: 'blob' });
  }
  getCategoriesPdf(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken, 
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.url}`+"/categories", { headers: headers, responseType: 'blob' });
  }
}
