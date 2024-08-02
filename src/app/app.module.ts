import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './Components/home/home.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { PowerBiComponent } from './Components/power-bi/power-bi.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { HttpClientModule } from '@angular/common/http';
import { LivreComponent } from './Components/livre/livre.component';
import { EtudiantComponent } from './Components/etudiant/etudiant.component';
import { AjouterComponent } from './Components/ajouter/ajouter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpruntsComponent } from './Components/emprunts/emprunts.component';
import { RservesComponent } from './Components/rserves/rserves.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   CategoriesComponent,
    PowerBiComponent,
    LivreComponent,
    EtudiantComponent,
    AjouterComponent,
    EmpruntsComponent,
    RservesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDrawer,
    PowerBIEmbedModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
