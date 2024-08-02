import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from '../../Services/emprunt.service';
import { Emprunte } from '../../Models/Emprunt.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../../Services/search.service';
@Component({
  selector: 'app-emprunts',
  templateUrl: './emprunts.component.html',
  styleUrl: './emprunts.component.scss'
})
export class EmpruntsComponent implements OnInit{
  emprunts:Emprunte[] = [];
  query: string = '';

  dataSource:any;
  displayedColumns: string[] = ['titre', 'category', 'type', 'etudiant', 'status', 'quantite', 'dateEmprunt', 'dateRetour', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private router:Router,private empruntService: EmpruntService,private searchService:SearchService,) { }
  ngOnInit(): void {
    this.getEmprunts();

   }
  
/*    public onSearch(): void {
    this.searchService.searchLivres(this.query).subscribe(
      (data) => {
        console.log(data);
        this.livres = [data];
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
  } */
  
  
   public getEmprunts(): void {
    this.empruntService.getEmprunts().subscribe(
      (data) => {
        console.log(data);
        this.emprunts = data
        this.dataSource=new MatTableDataSource<Emprunte>(this.emprunts);
        this.dataSource.paginator=this.paginator;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
}
}