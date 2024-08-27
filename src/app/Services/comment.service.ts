import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "http://localhost:8085/admin";
  private EtdUrl = "http://localhost:8085/etudiant";
  constructor(private http: HttpClient) { }

  public deleteComment(id: number) {
    return this.http.delete(`${this.url}/comment/${id}`);
  }
  public addComment(comment: Comment,idLivre:number,idEtudiant:number):Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Comment>(`${this.EtdUrl}/commenter/${idLivre}/${idEtudiant}`, comment,{ headers });
  }
}
