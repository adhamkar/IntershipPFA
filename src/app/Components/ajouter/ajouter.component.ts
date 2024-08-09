import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AjouterService } from '../../Services/ajouter.service';
import { Etudiant } from '../../Models/Etudiant.model';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { timeInterval, timeout } from 'rxjs';

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
  alertType: string | null = null;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private formBuilder: FormBuilder,private service :AjouterService,
    private _formBuilder: FormBuilder) { }

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
      this.alertType = 'success';
    },
    (error)=>{
      console.log(error);
      this.alertType = 'echec';
    }
  )
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    
    this.selectedFile = input.files[0];
    
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
   this.onUpload();
   setTimeout(() => {
    this.SaveEtudiant();
   }, 1500);
   
}


}
