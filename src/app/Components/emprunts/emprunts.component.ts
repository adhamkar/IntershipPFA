import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from '../../Services/emprunt.service';
import { Emprunte } from '../../Models/Emprunt.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-emprunts',
  templateUrl: './emprunts.component.html',
  styleUrl: './emprunts.component.scss'
})
export class EmpruntsComponent implements OnInit{
  emprunts:Emprunte[] = [];
  currentPage:number = 1;
  pageSize:number = 5;
  totalPages:number = 0;
  dataSource:any;
  displayedColumns: string[] = ['titre', 'category', 'type', 'etudiant', 'status', 'quantite', 'dateEmprunt', 'dateRetour', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private router:Router,private empruntService: EmpruntService) { }
  ngOnInit(): void {
    this.getEmprunts();

   }
  
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