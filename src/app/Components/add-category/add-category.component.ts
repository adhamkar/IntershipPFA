import { Component, OnInit } from '@angular/core';
import { AjouterService } from '../../Services/ajouter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  category:any;
  currentStep = 1;
  selectedFile: File | null = null;
  isUploaded: boolean = false;
  constructor(private service :AjouterService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
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
    this.category=this.categoryForm.value;
    this.service.addCategory(this.category).subscribe(
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
    )
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
}
