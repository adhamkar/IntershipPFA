import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../../Services/livre.service';
import { Comment } from '../../Models/Comment.model';
import { Livre } from '../../Models/Livre.model';
import { EtudiantService } from '../../Services/etudiant.service';
import { Etudiant } from '../../Models/Etudiant.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../Services/auth.service';
import { CommentService } from '../../Services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livre-profil',
  templateUrl: './livre-profil.component.html',
  styleUrl: './livre-profil.component.scss'
})
export class LivreProfilComponent implements OnInit {
  commentForm!: FormGroup;
  comment!:Comment;
  showCommentForm = false;
  showAllComments = false;
  comments: Comment[] = [];
  livre!:Livre;
  imageUrl!: SafeUrl;
  etudiant:Etudiant[] = [];

  commentUser!:Etudiant;
  AllEtudiant!:Etudiant[];

  private id!:number;
  constructor(private route: ActivatedRoute,private service: LivreService,private etudiantService: EtudiantService,
    private sanitizer: DomSanitizer, protected authService:AuthService,private commentService: CommentService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getUser(this.authService.getAuthenticatedUser())
      this.getLivre();  
      this.getLivreComments();
      this.commentForm = this.formBuilder.group({
        commentaire: [null, Validators.required],
       

      });
  
  });
  

}
  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
  }
  getLivreComments(): void {
    this.service.getlivreComments(this.id).subscribe(
      data => {
        data.forEach(cmt=>{
          if(typeof cmt.etudiant === 'number'){
           this.etudiantService.getEtudiant(cmt.etudiant).subscribe(
            studentDetails=>{
              cmt.etudiant=studentDetails;
            },
            error => console.error(`Failed to fetch student details for ID ${cmt.etudiant}`, error)
           )
          }
        })
        this.comments = data;
        console.log(this.comments);
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
        if(this.livre.image){
          this.fetchImage(this.livre.image.name);
        }
        //this.fetchImage(this.livre.image.name);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  fetchImage(fileName: string): void {
    this.etudiantService.getImage(fileName).subscribe(
      (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => {
        console.error('Error fetching image', error);
      }
    );
  }
  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      data => {
        if(window.confirm('Etes-vous sûr de vouloir supprimer ce commentaire?')) {
          this.getLivreComments();
        }
        window.alert('Commentaire supprimer avec succès');
      },
      error => {
        console.log(error);
      });
    }
    getUser(email:string): Promise<void> {
      email=this.authService.getAuthenticatedUser();
      return new Promise((resolve, reject) =>{
        this.etudiantService.getEtudiants().subscribe(
          data => {
            this.AllEtudiant = data;
            for(let i=0;i<this.AllEtudiant.length;i++){
              if(this.AllEtudiant[i].email===email){
                this.commentUser=this.AllEtudiant[i];
                break;
              }
              resolve();
            }
            console.log(this.etudiant);
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
      })
    }


    addComment(){
      this.comment = this.commentForm.value;
      console.log('Comment to be added:', JSON.stringify(this.comment));
      this.commentService.addComment(this.comment,this.id,this.commentUser.id).subscribe(
        data => {
          this.getLivreComments();
          this.commentForm.reset();
          window.alert('Commentaire ajouté avec succès');
        },
        error => {
          console.log(error);
        });
    }
}
