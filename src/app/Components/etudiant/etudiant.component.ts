  import { Component, OnInit, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
  import { EtudiantService } from '../../Services/etudiant.service';
  import { Etudiant } from '../../Models/Etudiant.model';
  import { Image } from '../../Models/Image.model';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AjouterComponent } from '../ajouter/ajouter.component';
import { SearchService } from '../../Services/search.service';
import { PDFsService } from '../../Services/pdfs.service';
import { AuthService } from '../../Services/auth.service';
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
    number: number = 0;
    pageSize = 3;
    pageIndex = 0;
    totalPages = 0;
    paginatedEtudiants: { etudiant: Etudiant, imageUrl: SafeUrl }[] = [];
    query: string = '';
    isSearch:boolean=false
  
  constructor(private router:Router, private etudiantService:EtudiantService,
    private sanitizer: DomSanitizer,public dialog: MatDialog,
    private searchService:SearchService,
    private pdfService: PDFsService, protected authService: AuthService
    ) { }

    ngOnInit(): void {
    this.getAllEtudiants();
    this.fetchAllEtudiants();
    console.log(this.pageIndex);

    }

    exportEtudiantsPdf() {
      this.pdfService.getEtudiantPdf().subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'etudiants.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error exporting PDF:', error);
      });
    }
 
     public getAllEtudiants(): void {
      this.etudiantService.getEtudiants().subscribe(
        (data) => {
          console.log(data);
          this.etudiants = data;
          
          this.number = this.etudiants.length;
          this.totalPages = Math.ceil(this.number / this.pageSize);
          this.updatePaginatedEtudiants();
        },
        (error) => {
          console.log("il'y'a une erreur :"+error);
        }
      );
    } 
    
public onSearch(): void {
  this.searchService.searchEtudiants(this.query).subscribe(
    (data) => {
      console.log(data);
      this.isSearch=true;
      this.etudiants = data;
      this.number = this.etudiants.length;
      if(this.query==''){
        this.isSearch=false;

      }
  
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
    openDialog(): void {
      const dialogRef = this.dialog.open(AjouterComponent, {
        width: '40%',
        height: '600px',
        enterAnimationDuration:'500ms',
        exitAnimationDuration:'500ms',
        data: {}  
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed with result: ', result);
        }
      });
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
          this.updatePaginatedEtudiants();
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
          this.updatePaginatedEtudiants();
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
    updatePaginatedEtudiants(): void {
      const start = this.pageIndex * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedEtudiants = this.Alletudiants.slice(start, end);
    }
  
    nextPage(): void {
      if (this.pageIndex + 1 < this.totalPages) {
        this.pageIndex++;
        this.updatePaginatedEtudiants();
      }
    }
  
    previousPage(): void {
      if (this.pageIndex > 0) {
        this.pageIndex--;
        this.updatePaginatedEtudiants();
      }
    }

  viewProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }
    
  }
