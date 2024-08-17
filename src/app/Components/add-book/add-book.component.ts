  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AjouterService } from '../../Services/ajouter.service';
import { AdminService } from '../../Services/admin.service';
import { Bibliothecaire } from '../../Models/Bibliothecaire.model';
import { Livre } from '../../Models/Livre.model';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Category } from '../../Models/Category.model';

  @Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrl: './add-book.component.scss'
  })
  export class AddBookComponent implements OnInit{
    livreForm!: FormGroup;
    livre!:Livre;
    currentStep = 1;
    selectedFile: File | null = null;
    isUploaded: boolean = false;
    bibliothecaires: Bibliothecaire[] = []; 
    categories: Category[] = [];
    infoCategories: Category[] = [];
    mathCategories: Category[] = [];
    physiqueCategories: Category[] = [];
    filteredCategories: Category[] = [];
    selectedCategoryType: string | null = null;

    constructor(private service :AjouterService,private formBuilder: FormBuilder,private adminService: AdminService,
      private Categoryservice: CategoryServiceService) { }

    ngOnInit(): void {
      
      this.livreForm = this.formBuilder.group({
        titre: [null, Validators.required],
        auteur: [null, Validators.required],
        description: [null, Validators.required],
        dateSortie: [null, Validators.required],
        quantite: [null, [Validators.required,Validators.pattern("^[0-9]*$")]],
        disponibilite: [null, Validators.required],
        category: [null],  
        bibliothecaire: [null, Validators.required]

      });
      this.fetchBibliothecaire();
      this.fetchCategories();
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
        this.isUploaded=true;
      }
    }

    onUpload() {
    
      if (this.selectedFile) {
        this.service.uploadImage(this.selectedFile).subscribe(response => {
          console.log('Upload success', response);
        }, error => {
          console.error('Upload error', error);
        });
      }
    }
    updateBookCategory(domaine:string,sousDomaine:string){
      this.adminService.updateBookCategory(this.livre,domaine,sousDomaine).subscribe(
        (data)=>{
          console.log(data);
          this.livre=data;
          this.livreForm.reset();
          location.reload();
          //this.alertType = 'success';
        },
        (error)=>{
          console.log(error);
          //this.alertType = 'echec';
        }
      )
    }
    Save(){
      this.livre=this.livreForm.value;
       this.adminService.addBook(this.livre).subscribe(
        (data)=>{
          console.log(data);
          this.livre=data;
          this.livreForm.reset();
          //this.alertType = 'success';
        },
        (error)=>{
          console.log(error);
          //this.alertType = 'echec';
        }
      ) 
    }
    fetchBibliothecaire(){
      this.adminService.getAllBibliothecaire().subscribe(
        (data)=>{
          console.log(data);
          this.bibliothecaires=data;
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    fetchCategories(){
      this.Categoryservice.getCategories().subscribe(
        (data)=>{
          console.log(data);
          this.categories = data;
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    /* fetchIngoCategories(){
      this.categories.forEach(element => {
        if(element.domaine=="Informatique"){
          this.infoCategories.push(element);
        }
      });
    }
    fetchMathCategories(){
      this.categories.forEach(element => {
        if(element.domaine=="mathematique"){
          this.mathCategories.push(element);
        }
      });
    }

    fetchPhysiqueCategories(){
      this.categories.forEach(element => {
        if(element.domaine=="Physique"){
          this.physiqueCategories.push(element);
        }
      });
    } */

    onCategoryTypeChange(event: Event) {
      const selectedType = (event.target as HTMLSelectElement).value;
      this.selectedCategoryType = selectedType; 
      this.filteredCategories = this.categories.filter(
        category => category.domaine === selectedType
      );
    }

    goToStep(step: number) {
      this.currentStep = step;
    }

    nextStep() {
      if ( this.isUploaded) {
          if(this.currentStep==1){
          this.onUpload();
        }  
        if(this.currentStep==2){
          this.Save();
        } 
        this.currentStep++;
      }
    }

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
    deleteBook(id:number){
      this.adminService.deleteBook(id).subscribe(
        (data)=>{
          console.log(data);
          //this.alertType = 'success';
        },
        (error)=>{
          console.log(error);
          //this.alertType = 'echec';
        }
      )
    }
    Cancel(){
      this.livreForm.reset();
      this.service.deleteLastImage().subscribe(
        (data)=>{
          console.log(data);
          location.reload();
        },
        (error)=>{
          console.log(error);
        }
      )
      
    }
    CancelSave(){
      this.deleteBook(this.livre.id);
      location.reload();
    }
  }
