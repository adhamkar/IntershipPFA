import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../../Services/livre.service';
import { Comment } from '../../Models/Comment.model';

@Component({
  selector: 'app-livre-profil',
  templateUrl: './livre-profil.component.html',
  styleUrl: './livre-profil.component.scss'
})
export class LivreProfilComponent implements OnInit {
  showCommentForm = false;
  showAllComments = false;
  comments: Comment[] = [];
  private id!:number;
  constructor(private route: ActivatedRoute,private service: LivreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      
  });
  this.getLivreComments();
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
}
