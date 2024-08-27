import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { EtudiantService } from '../../Services/etudiant.service';
import { Etudiant } from '../../Models/Etudiant.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmpruntService } from '../../Services/emprunt.service';
import { Emprunte } from '../../Models/Emprunt.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit{
  etudiant!:Etudiant;
  AllEtudiant!:Etudiant[];
  imageUrl!: SafeUrl;
  emprunts!:number;
  isModalOpen = false;
  updateEtdForm!:FormGroup;
  myProfil!:Etudiant;
constructor(private service: EtudiantService,private formBuilder: FormBuilder ,private authService: AuthService,private sanitizer: DomSanitizer,private empruntService: EmpruntService){}

  ngOnInit(): void {
    this.getUser(this.authService.getAuthenticatedUser()).then(()=>{
      this.loadAuthStudentImage();
      this.getuserEmprunts();
 
    });
    this.updateEtdForm = this.formBuilder.group({
      nom: [null],
      prenom: [null],
      tel: [null],
      ville: [null],
      sexe: [null],
      niveau: [null],
      nationalite: [null],
      filiere: [null],
      //email: [null],

    }); 
  }

  getUser(email:string): Promise<void> {
    email=this.authService.getAuthenticatedUser();
    return new Promise((resolve, reject) =>{
      this.service.getEtudiants().subscribe(
        data => {
          this.AllEtudiant = data;
          for(let i=0;i<this.AllEtudiant.length;i++){
            if(this.AllEtudiant[i].email===email){
              this.etudiant=this.AllEtudiant[i];
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

  loadAuthStudentImage(){
    if(this.etudiant){    
    this.service.getEtudiant(this.etudiant.id).subscribe(
      data => {
        this.etudiant = data;
        this.fetchImage(this.etudiant.image.name);
      },
      error => {
        console.log(error);
      })
    }
  }
  fetchImage(fileName: string): void {
    this.service.getImage(fileName).subscribe(
      (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => {
        console.error('Error fetching image', error);
      }
    );
  }
  getuserEmprunts(){
    this.emprunts=this.etudiant.emprunts.length;
  }
  updateprofil(){
    this.myProfil=this.updateEtdForm.value;
      this.service.updateEtudiantById(this.myProfil,this.etudiant.id).subscribe(
        data => {
          console.log(data);
          this.myProfil = data;
          this.closeModal();
          this.updateEtdForm.reset();
          this.getUser(this.authService.getAuthenticatedUser());
          this.closeModal();
        },
        error => {
          console.log(error);
        }
      );
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
