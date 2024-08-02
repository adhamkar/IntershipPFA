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

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'emprunts', component: EmpruntsComponent },
  { path: 'reservations', component: RservesComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'powerbi', component: PowerBiComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'livres', component: LivreComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
