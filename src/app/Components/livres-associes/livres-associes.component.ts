import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livre } from '../../Models/Livre.model';
import { CategoryServiceService } from '../../Services/category-service.service';

@Component({
  selector: 'app-livres-associes',
  templateUrl: './livres-associes.component.html',
  styleUrl: './livres-associes.component.scss'
})
export class LivresAssociesComponent implements OnInit{

  livres: Livre[] = [];
  sousDomaine!: string ;
  size: number = 0;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryServiceService
  ) { }
/*
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
        this.fetchImage(this.myProfil.image.name);
      },
      error => {
        console.log(error);
      }
    );
  }
*/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sousDomaine = params['type'];
      this.getLivresBySousDomaine(this.sousDomaine);
    });
   /*  this.sousDomaine = this.route.snapshot.paramMap.get('type') || '';
    this.getLivresBySousDomaine(this.sousDomaine); */
  }
  getLivresBySousDomaine(sousDomaine: string): void {
    this.categoryService.getLivresBySousDomaines(sousDomaine).subscribe(
      (data) => {
        this.livres = data;
        this.size = this.livres.length;
      },
      (error) => {
        console.error("Error fetching books: ", error);
      }
    );
  }
}
