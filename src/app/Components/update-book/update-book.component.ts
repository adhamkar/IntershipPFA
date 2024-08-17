import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../../Services/category-service.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent implements OnInit {

  private id!:number;
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);

     /*  this.categoryForm = this.formBuilder.group({
        domaine: [null],
        sous_domaine: [null],
      }); */
    });
  }
  

}
