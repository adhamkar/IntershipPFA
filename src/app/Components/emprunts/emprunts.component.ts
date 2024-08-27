import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from '../../Services/emprunt.service';
import { Emprunte } from '../../Models/Emprunt.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../../Services/search.service';
import { PDFsService } from '../../Services/pdfs.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-emprunts',
  templateUrl: './emprunts.component.html',
  styleUrl: './emprunts.component.scss'
})
export class EmpruntsComponent implements OnInit{
  emprunts:Emprunte[] = [];
  filteredEmprunts: Emprunte[] = [];
  query: string = '';
  number: number = 0;

  dataSource:any;
  displayedColumns: string[] = ['titre', 'category', 'type', 'etudiant', 'status', 'quantite', 'dateEmprunt', 'dateRetour', 'actions'];
  displayedColumnsStudent: string[] = ['titre', 'category', 'type', 'etudiant', 'status', 'quantite', 'dateEmprunt', 'dateRetour'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private router:Router,private empruntService: EmpruntService,private searchService:SearchService,
    private pdfService: PDFsService,protected authService: AuthService) { }

  ngOnInit(): void {
    this.getEmprunts();

   }

   exportEmpruntsPdf() {
    this.pdfService.getEmpruntPDFs().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'emprunts.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error exporting PDF:', error);
    });
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
        this.number = this.emprunts.length;
        this.dataSource=new MatTableDataSource<Emprunte>(this.emprunts);
        this.dataSource.paginator=this.paginator;
      },
      (error) => {
        console.log("il'y'a une erreur"+error);
      }
    );
}
public onSearch(): void {
  this.searchService.searchEmprunte(this.query).subscribe(
    (data) => {
      console.log(data);
      this.filteredEmprunts = data;
      this.dataSource=new MatTableDataSource<Emprunte>(this.filteredEmprunts);
      if(this.query===''){
        
        this.getEmprunts();
      }
    },
    (error) => {
      console.log("il'y'a une erreur"+error);
    }
  );
}
}