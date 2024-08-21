import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { PowerBiComponent } from './Components/power-bi/power-bi.component';
import { EtudiantComponent } from './Components/etudiant/etudiant.component';
import { LivreComponent } from './Components/livre/livre.component';
import { AjouterComponent } from './Components/ajouter/ajouter.component';
import { EmpruntsComponent } from './Components/emprunts/emprunts.component';
import { RservesComponent } from './Components/rserves/rserves.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LivresAssociesComponent } from './Components/livres-associes/livres-associes.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/update-category/update-category.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { UpdateBookComponent } from './Components/update-book/update-book.component';
import { LivreProfilComponent } from './Components/livre-profil/livre-profil.component';
import { TasksComponent } from './Components/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'emprunts', component: EmpruntsComponent },
  { path: 'reservations', component: RservesComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'powerbi', component: PowerBiComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'livres', component: LivreComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'livresAssocies/:type', component: LivresAssociesComponent },
  { path: 'addCat', component: AddCategoryComponent },
  { path: 'updateCat/:id', component: UpdateCategoryComponent },
  { path: 'addBook', component: AddBookComponent },
  { path: 'updateBook/:id', component: UpdateBookComponent },
  { path: 'livreprofil/:id', component: LivreProfilComponent },
  { path: 'tasks', component: TasksComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
