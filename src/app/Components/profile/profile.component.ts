import { AfterViewInit, Component, Input, OnInit, ViewChild  } from '@angular/core';
import { Etudiant } from '../../Models/Etudiant.model';
import { EtudiantComponent } from '../etudiant/etudiant.component';
import { EtudiantService } from '../../Services/etudiant.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Emprunte } from '../../Models/Emprunt.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  private id!:number;
  isModalOpen = false;
  myProfil!:Etudiant;
  updateEtdForm!:FormGroup;
  emprunts:Emprunte[] = [];
  paginatedEmprunts: Emprunte[] = [];
  isInfo:boolean = true;
  isEmpr:boolean = false;
  isResv:boolean = false;
  imageUrl!: SafeUrl;
  number: number = 0;
  pageSize = 8;
  pageIndex = 0;
  totalPages = 0;

 
  
  constructor(private etudiantService: EtudiantService,private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      
      this.getProfile(this.id);
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
    });
  }

  updateprofil(){
    this.myProfil=this.updateEtdForm.value;
      this.etudiantService.updateEtudiantById(this.myProfil,this.id).subscribe(
        data => {
          console.log(data);
          this.myProfil = data;
          this.closeModal();
          this.updateEtdForm.reset();
          this.closeModal();
        },
        error => {
          console.log(error);
        }
      );
  }

  getProfile(id:number){
    this.etudiantService.getEtudiant(id).subscribe(
      data => {
        console.log(data);
        this.myProfil = data;
        this.fetchImage(this.myProfil.image.name);
        this.emprunts = this.myProfil.emprunts;
        this.totalPages = Math.ceil(this.emprunts.length / this.pageSize);
        this.updatePagination();
        
      },
      error => {
        console.log(error);
      }
    );
  }
  updatePagination(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmprunts = this.emprunts.slice(start, end);
  }

  nextPage(): void {
    if (this.pageIndex + 1 < this.totalPages) {
      this.pageIndex++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagination();
    }
  }
  onInfo(){
    this.isInfo = true;
    this.isEmpr = false;
    this.isResv = false;
  }
  onEmpr(){
    this.isInfo = false;
    this.isEmpr = true;
    this.isResv = false;
  }
  onResv(){
    this.isInfo = false;
    this.isEmpr = false;
    this.isResv = true;
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
 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
