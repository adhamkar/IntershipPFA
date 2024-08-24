import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/Etudiant.model';
import { Image } from '../Models/Image.model';
import { Task } from '../Models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private url = "http://localhost:8085/admin";
  private imageApiUrl = 'http://localhost:8085/image/';
  private etudiantUrl="http://localhost:8085/etudiant";

  constructor(private http: HttpClient) { }
  
  public getEtudiants():Observable<any>  {
    return this.http.get<any>(`${this.url}`+"/etudiants");
  }
  public getEtudiantsPage(page:number,size:number):Observable<any>  {
    return this.http.get<any>(`${this.url}/paginated?page=${page}&size=${size}`);
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
  public getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.url}/etudiant/${id}`);
  }
  public getAuthEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.url}/etudiant/${etudiant.id}`);
  }
  public updateEtudiantById(etudiant: Etudiant,id: number): Observable<Etudiant> {
    return this.http.patch<Etudiant>(`${this.url}/etudiant/${id}`, etudiant);
  }
  // task management
  public getStudentTasks(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.etudiantUrl}/tasks/${id}`);
  }
  public addTask(task: Task,studentId:number): Observable<Task> {
    return this.http.post<Task>(`${this.etudiantUrl}/addtask/${studentId}`, task);
  }
  public updateTask(task: Task,id:number): Observable<Task> {
    return this.http.patch<Task>(`${this.etudiantUrl}/updateTask/${id}`, task);
  }
  public deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.etudiantUrl}/delete/${id}`);
  }
  public markTaskComplete(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.etudiantUrl}/complete/${id}`, {});
  }
  public markTaskAsComplete(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.etudiantUrl}/complete/${id}`, {});
  }
  
  

}
