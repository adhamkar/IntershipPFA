  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AjouterService } from '../../Services/ajouter.service';

  @Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrl: './add-book.component.scss'
  })
  export class AddBookComponent implements OnInit{
    livreForm!: FormGroup;
    livre:any;
    currentStep = 1;
    selectedFile: File | null = null;
    isUploaded: boolean = false;

    constructor(private service :AjouterService,private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      
      this.livreForm = this.formBuilder.group({
        domaine: [null, Validators.required],
        sous_domaine: [null, Validators.required],
      });

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

    Save(){
      this.livre=this.livreForm.value;
  /*     this.service.addCategory(this.category).subscribe(
        (data)=>{
          console.log(data);
          this.category=data;
          this.categoryForm.reset();
          //this.alertType = 'success';
        },
        (error)=>{
          console.log(error);
          //this.alertType = 'echec';
        }
      ) */
    }

    goToStep(step: number) {
      this.currentStep = step;
    }

    nextStep() {
      if (this.currentStep < 2 && this.isUploaded) {
        this.onUpload();
        this.currentStep++;
      }
    }

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
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
  }
