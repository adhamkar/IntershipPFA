import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../../Services/livre.service';
import { Comment } from '../../Models/Comment.model';
import { Livre } from '../../Models/Livre.model';
import { EtudiantService } from '../../Services/etudiant.service';
import { Etudiant } from '../../Models/Etudiant.model';

@Component({
  selector: 'app-livre-profil',
  templateUrl: './livre-profil.component.html',
  styleUrl: './livre-profil.component.scss'
})
export class LivreProfilComponent implements OnInit {
  showCommentForm = false;
  showAllComments = false;
  comments: Comment[] = [];
  livre!:Livre;
  etudiant:Etudiant[] = [];
  private id!:number;
  constructor(private route: ActivatedRoute,private service: LivreService,private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getLivre();  
      this.getLivreComments();
  
  });
  

}
  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
  }
  getLivreComments(): void {
    this.service.getlivreComments(this.id).subscribe(
      data => {
        this.comments = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  getLivre(){
    this.service.getLivreById(this.id).subscribe(
      data => {
        this.livre = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
/*   getEtudiant(){
    this.etudiantService.getEtudiant(this.comments.).subscribe(
      data => {
        console.log(data);
        this.etudiant = data;

      },
      error => {
        console.log(error);
      }
    );
  } */
}
