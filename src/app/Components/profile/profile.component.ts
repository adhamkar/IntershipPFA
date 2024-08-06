import { Component, Input, OnInit  } from '@angular/core';
import { Etudiant } from '../../Models/Etudiant.model';
import { EtudiantComponent } from '../etudiant/etudiant.component';
import { EtudiantService } from '../../Services/etudiant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  myProfil!:Etudiant;
  isInfo:boolean = true;
  isEmpr:boolean = false;
  isResv:boolean = false;

  constructor(private etudiantService: EtudiantService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Récupère l'ID de l'étudiant à partir de l'URL
      this.getProfile(id);
    });
  }

  getProfile(id:number){
    this.etudiantService.getEtudiant(id).subscribe(
      data => {
        console.log(data);
        this.myProfil = data;
      },
      error => {
        console.log(error);
      }
    );
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
}
