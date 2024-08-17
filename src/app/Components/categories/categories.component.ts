import { Component,OnInit } from '@angular/core';
import { Category } from '../../Models/Category.model';
import { Router } from '@angular/router';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Livre } from '../../Models/Livre.model';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../../Services/search.service';
import { LivresAssociesComponent } from '../livres-associes/livres-associes.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

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

  isTables:boolean=true;
  total:number=0;
  totalBySD:number=0;
  pageSize :number=6;
  pageIndex = 0;
  totalItems = 0;
  query: string = '';
  size: number = 0;
  isCards:boolean=false;
  public showAlert: boolean = false;
public alertMessage: string = '';

  constructor(private router:Router, private Categoryservice: CategoryServiceService,
    private searchService:SearchService,public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.pageSize = 6;
    //this.getAllCategories();
    this.loadPages();
  }

  public getAllCategories(): void {
    this.isTout = true;
    this.Categoryservice.getCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
        this.categories.forEach(category => {
          ++this.total;
        })
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
  public onSearch(): void {
    this.searchService.searchcategories(this.query).subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
        this.filter=data;
        if(this.query===''){
          
          this.loadPages();
        }
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }

  public ToutButton(){
    this.isTout = true;
    //this.getAllCategories();
    this.loadPages();
  }
  public TableView(){
    this.isTables = true;
    this.isCards = false;
    this.loadPages();
  }
  public CardsView(){
    this.isTables = false;
    this.isCards = true;
    this.ToutButton();
  }
  public filterCategories(domaine: string) {
    this.isTout = false;
    this.filter = this.categories.filter(category => category.domaine === domaine);
    if(!this.isCards){
      if(domaine === "Informatique"){
        this.displayInfoCategories();
      }else if(domaine==="Physique"){
        this.displayPhysiqueCategories();
      }else{
        this.displayMathCategories();
      }
    }
    
  }
  public getLivresBySousDomaines(sousDomaine: string){
    this.Categoryservice.getLivresBySousDomaines(sousDomaine).subscribe(
      (data) => {
        console.log(data);
        this.livres = data;
        this.size = this.livres.length;
        console.log(this.size);
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
   
  }

  loadPages(){
    this.Categoryservice.getCategoriesPage(this.pageIndex,this.pageSize).subscribe(
      (data) => {
        console.log(data);
        this.categories = data.content;
        this.totalItems = data.totalElements;

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
  displayInfoCategories(){
    this.Categoryservice.getInformatiqueCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
  displayMathCategories(){
    this.Categoryservice.getMathematiqueCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
  displayPhysiqueCategories(){
    this.Categoryservice.getPhysiqueCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  }
  public navigateToLivresAssocies(sousDomaine: string) {
  this.Categoryservice.getLivresBySousDomaines(sousDomaine).subscribe(
    (data) => {
      console.log(data);
      this.livres = data;
      this.size = this.livres.length;
      console.log(this.size);
      if(this.size>0){
        this.router.navigate(['/livresAssocies',sousDomaine]);
      }else{
        this.alertMessage = "Aucun livre n'est associé à ce domaine";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1300);
      }
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
  }
  navigateToUpdateCat(id: number) {
    this.router.navigate(['/updateCat', id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
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
  updateDialog(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
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
  deleteCategory(id:number){
    this.Categoryservice.DeleteCategoryById(id).subscribe(
      (data)=>{
        console.log(data);
       this.loadPages();
      },
      (error)=>{
        console.log("il'y'a une erreur"+error);
      }
    )
  }
  viewProfile(id: number) {
    this.router.navigate(['/updateCat', id]);
  }
}

