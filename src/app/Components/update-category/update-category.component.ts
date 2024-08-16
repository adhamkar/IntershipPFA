import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryServiceService } from '../../Services/category-service.service';
import { Category } from '../../Models/Category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {
private category!:Category;
categoryForm!: FormGroup;
private id!:number;

  constructor(private route: ActivatedRoute,private categoryService: CategoryServiceService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);

      this.categoryForm = this.formBuilder.group({
        domaine: [null],
        sous_domaine: [null],
      });
    });
  }
 update(){
  this.category=this.categoryForm.value;
    this.categoryService.updateCategory(this.category,this.id).subscribe(
      data => {
        console.log(data);
        this.category = data;
        this.categoryForm.reset();
        this.router.navigate(['/categories']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
