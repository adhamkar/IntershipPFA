import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Livre } from '../../Models/Livre.model';
import { LivreService } from '../../Services/livre.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent implements OnInit {

  private id!:number;
  private livre!:Livre;
  livreForm!: FormGroup;
  isfilled:boolean=false;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,private router:Router,
    private livreService: LivreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);

       this.livreForm = this.formBuilder.group({
        titre: [null],
        auteur: [null],
        disponibilite: [null],
        description: [null],
        quantite: [null],
        dateSortie: [null],

      }); 
    });
  }
  allFieldsEmpty(): boolean {
    return Object.values(this.livreForm.controls).every(control => !control.value);
  }
  update(){
    this.livre=this.livreForm.value;
      this.livreService.updateBook(this.livre,this.id).subscribe(
        data => {
          console.log(data);
          this.livre = data;
          this.livreForm.reset();
          this.router.navigate(['/livres']);
        },
        error => {
          console.log(error);
        }
      );
    }

}
