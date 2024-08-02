  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { EtudiantService } from '../../Services/etudiant.service';
  import { Etudiant } from '../../Models/Etudiant.model';
  import { Image } from '../../Models/Image.model';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
  @Component({
    selector: 'app-etudiant',
    templateUrl: './etudiant.component.html',
    styleUrl: './etudiant.component.scss'
  })
  export class EtudiantComponent implements OnInit {
    imageUrl!: SafeUrl;
    etudiants: Etudiant[] = [];
    Alletudiants: { etudiant: Etudiant, imageUrl: SafeUrl }[] = [];
    images: { image: Image, imageUrl: SafeUrl }[] = [];
  constructor(private router:Router, private etudiantService:EtudiantService,private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
    this.getAllEtudiants();
    this.fetchAllEtudiants();
    }
    
     public getAllEtudiants(): void {
      this.etudiantService.getEtudiants().subscribe(
        (data) => {
          console.log(data);
          this.etudiants = data;
        },
        (error) => {
          console.log("il'y'a une erreur :"+error);
        }
      );
    } 
  
     public getAllImages(): void {
      this.etudiantService.getImages().subscribe(
        (data) => {
          console.log(data);
          this.images = data.map(image => ({ image, imageUrl: this.sanitizer.bypassSecurityTrustUrl(image.getImageDataUrl()) }));
        },
        (error) => {
          console.log("il'y'a une erreur :"+error);
        }
      );
    } 
    public getImageUrl(fileName: string): string {
      return this.etudiantService.getImageUrl(fileName);
    }

    fetchAllImages(): void {
      this.etudiantService.getImages().subscribe(
        (images: Image[]) => {
          images.forEach(image => {
            this.fetchImage(image.name, image);
          });
        },
        error => {
          console.error('Error fetching images', error);
        }
      );
    }
  
    fetchImage(fileName: string, image: Image): void {
      this.etudiantService.getImage(fileName).subscribe(
        (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.images.push({ image, imageUrl });
        },
        error => {
          console.error('Error fetching image', error);
        }
      );
    }

    fetchAllEtudiants(): void {
      this.etudiantService.getEtudiants().subscribe(
        (etudiants: Etudiant[]) => {
          etudiants.forEach(etudiant => {
            if (etudiant.image && etudiant.image.name) {
              this.fetchImageEtudiant(etudiant);
            } else {
              this.Alletudiants.push({ etudiant, imageUrl: '' });
            }
          });
        },
        error => {
          console.error('Error fetching students', error);
        }
      );
    }
  
    fetchImageEtudiant(etudiant: Etudiant): void {
      this.etudiantService.getImage(etudiant.image.name).subscribe(
        (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.Alletudiants.push({ etudiant, imageUrl });
        },
        error => {
          console.error('Error fetching image', error);
        }
      );
    }

    public deleteEtudiant(id: number): void {
      this.etudiantService.deleteEtudiant(id).subscribe(
        (data) => {
          console.log(data);
          location.reload();
        },
        (error) => {
          console.log("il'y'a une erreur :"+error);
        }
      );
    }
  }
