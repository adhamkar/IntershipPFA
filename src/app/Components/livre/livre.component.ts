import { Component, OnInit,Input, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { LivreService } from '../../Services/livre.service';
import { Router } from '@angular/router';
import { Livre } from '../../Models/Livre.model';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Category } from '../../Models/Category.model';
import { SearchService } from '../../Services/search.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PDFsService } from '../../Services/pdfs.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.scss'
})
export class LivreComponent implements OnInit{
  livres:Livre[] = [];
  filter: Livre[] = [];
  isTout:boolean = false;
  dataSource: MatTableDataSource<Livre> = new MatTableDataSource<Livre>(this.livres);
  displayedColumns: string[] = ['titre', 'auteur', 'category', 'description',  'quantite','type'];
  obs!: Observable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories: Category[] = [];
  categoryName:string[]=[];
  empruntsMap: { [key: number]: number } = {};
  total:number=0;
  isTables:boolean=true;
  isCards:boolean=false;
  query: string = '';
  pageSize !:number;
  pageIndex = 0;
  totalItems = 0
  
  ;
  ngOnInit(): void {
   //this.getAllLivres();
   //this.getAllCategories();
   //this.getCategoryName();
   this.pageSize = 3;
   this.loadPages();
   
  }

  public TableView(){
    this.isTables = true;
    this.isCards = false;
  }
  public CardsView(){
    this.isTables = false;
    this.isCards = true;
  }
constructor(private router:Router, private livreService: LivreService,
  private CatService:CategoryServiceService,
  private searchService:SearchService,
  private changeDetectorRef: ChangeDetectorRef,
  public dialog: MatDialog,
  private pdfService: PDFsService,protected authService: AuthService
  ) { }


public onSearch(): void {
  this.searchService.searchLivres(this.query).subscribe(
    (data) => {
      console.log(data);
      this.livres = data;
      if(this.query===''){
        this.loadPages();
      }
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
exportLivresPdf() {
  this.pdfService.getLivresPdf().subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'livres.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }, error => {
    console.error('Error exporting PDF:', error);
  });
}
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

loadPages(){
  this.livreService.getLivresPage(this.pageIndex,this.pageSize).subscribe(
    (data) => {
      console.log(data);
      this.livres = data.content;
      this.livres.forEach(livre => {
        this.getNombreEmprunts(livre.id);
      });
      this.totalItems = data.totalElements;
      console.log(this.livres);
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadPages();
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
openDialog(): void {
  const dialogRef = this.dialog.open(AddBookComponent, {
    width: '65%',
    height: '500px',
    enterAnimationDuration:'500ms',
    exitAnimationDuration:'500ms',
    data: {}  
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('The dialog was closed with result: ', result);
    }
  });
}
deleteBook(id:number){
  this.livreService.deleteLivre(id).subscribe(
    (data) => {
      console.log(data);
      this.loadPages();
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}

navigateToUpdateBook(id: number) {
  this.router.navigate(['/updateBook', id]);

}
navigateToProfileBook(id:number){
  this.router.navigate(['/livreprofil',id])
}
}