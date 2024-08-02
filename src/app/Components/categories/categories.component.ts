import { Component,OnInit } from '@angular/core';
import { Category } from '../../Models/Category.model';
import { Router } from '@angular/router';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Livre } from '../../Models/Livre.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[] = [];
  filter: Category[] = [];
  livres:Livre[] = [];
  isTout:boolean = false;
  isInfo: boolean = false;
  isMath: boolean = false;
  isPhysique: boolean = false;


  constructor(private router:Router, private Categoryservice: CategoryServiceService) { }

  ngOnInit(): void {
    this.getAllCategories();
    //this.getDomaine();
  }

  public getAllCategories(): void {
    this.isTout = true;
    this.Categoryservice.getCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
  public ToutButton(){
    this.isTout = true;
    this.getAllCategories();
  }

  public filterCategories(domaine: string) {
    this.isTout = false;
    this.filter = this.categories.filter(category => category.domaine === domaine);
    
  }
  public getLivresBySousDomaines(sousDomaine: string) {
    this.Categoryservice.getLivresBySousDomaines(sousDomaine).subscribe(
      (data) => {
        console.log(data);
        this.livres = data;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
}
