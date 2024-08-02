import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AjouterService } from '../../Services/ajouter.service';
import { Etudiant } from '../../Models/Etudiant.model';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.scss'
})
export class AjouterComponent implements OnInit {

  etudiantForm!: FormGroup;
  etudiant:any;
  image:any;
  selectedFile: File | null = null;
  isSelected: boolean = true;
  isUploaded: boolean = false;
 

  constructor(private formBuilder: FormBuilder,private service :AjouterService) { }

  ngOnInit(): void {
    this.etudiantForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      ville: [null, Validators.required],
      sexe: [null, Validators.required],
      cne: [null, Validators.required],
      nationalite: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      filiere: [null, Validators.required],
      niveau: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      tel: [null, [Validators.required, Validators.minLength(10)]],
      
    });
    
   }

   SaveEtudiant(){
  this.etudiant=this.etudiantForm.value;
  this.service.addEtdudiant(this.etudiant).subscribe(
    (data)=>{
      console.log(data);
      this.etudiant=data;
      this.etudiantForm.reset();
    },
    (error)=>{
      console.log(error);
    }
  )
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    
    this.selectedFile = input.files[0];
  }
}

onUpload(): void {
  
  if (this.selectedFile) {
    this.service.uploadImage(this.selectedFile).subscribe(response => {
      console.log('Upload success', response);
    }, error => {
      console.error('Upload error', error);
    });
  }
}
Save(){
  this.onUpload();
  this.SaveEtudiant();
}


}
