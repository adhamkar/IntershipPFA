import { Component, OnInit,Input  } from '@angular/core';
import { LivreService } from '../../Services/livre.service';
import { Router } from '@angular/router';
import { Livre } from '../../Models/Livre.model';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Category } from '../../Models/Category.model';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.scss'
})
export class LivreComponent implements OnInit{
  livres:Livre[] = [];
  filter: Livre[] = [];
  isTout:boolean = false;
  @Input() isclicked=false;
  

  categories: Category[] = [];
  categoryName:string[]=[];
  empruntsMap: { [key: number]: number } = {};
  total:number=0;
  isTables:boolean=true;
  isCards:boolean=false;

  
  ngOnInit(): void {
   this.getAllLivres();
   this.getAllCategories();
   this.getCategoryName()
  }

  public TableView(){
    this.isTables = true;
    this.isCards = false;
  }
  public CardsView(){
    this.isTables = false;
    this.isCards = true;
  }
constructor(private router:Router, private livreService: LivreService,private CatService:CategoryServiceService) { }

public getAllLivres(): void {

  this.livreService.getLivres().subscribe(
    (data) => {
      console.log(data);
      this.livres = data;
      this.livres.forEach(livre => {
        this.getNombreEmprunts(livre.id);
        ++this.total;
      });
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
public getAllCategories(): void {

  this.CatService.getCategories().subscribe(
    (data) => {
      console.log(data);
      this.categories = data;
      
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}

public getCategoryName(){
  this.livreService.getCategoriesName().subscribe(
    (data) => {
      console.log(data);
      this.categoryName = data;
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
public getNombreEmprunts(id:number):void{
  this.livreService.getNombreEmprunts(id).subscribe(
    (data) => {
      console.log(data);
      this.empruntsMap[id] = data;
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
/* public filterCategories(domaine: string) {
  this.isTout = true;
  this.filter = this.livres.filter(livre => livre.category.domaine === domaine);
  
} */
onCategoryClick(categoryId: number): void {
  this.CatService.getBooksByCategory(categoryId).subscribe((livres) => {
    this.livres = livres;
  });
}

displayBooksByCategory(categoryId: number): void {
  this.CatService.getBooksByCategory(categoryId).subscribe((livres) => {
    this.livres = livres;
  });
}
displayBooksByCategoryUsingDomaine(categoryName: string): void {
  console.log('Clicked category name:', categoryName);

  this.categories.forEach((category) => {
    if (category.domaine === categoryName) {
      this.displayBooksByCategory(category.id);
    }
  });
}

displayBooksOfInformatique(): void {
  this.livreService.getInformatiqueLivres().subscribe(
    (livres) => {
    this.livres = livres;
  },
  
  (error) => {
    console.log("il'y'a une erreur"+error);
  });
}
displayBooksOfMathematiques(): void {
  this.livreService.getMathematiqueLivres().subscribe(
    (livres) => {
    this.livres = livres;
  },
  
  (error) => {
    console.log("il'y'a une erreur"+error);
  });

}
displayBooksOfPhysique(): void {
  this.livreService.getPhysiqueLivres().subscribe(
    (livres) => {
    this.livres = livres;
  },
  
  (error) => {
    console.log("il'y'a une erreur"+error);
  });
}
}