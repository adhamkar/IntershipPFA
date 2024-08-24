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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LivreComponent } from './Components/livre/livre.component';
import { EtudiantComponent } from './Components/etudiant/etudiant.component';
import { AjouterComponent } from './Components/ajouter/ajouter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpruntsComponent } from './Components/emprunts/emprunts.component';
import { RservesComponent } from './Components/rserves/rserves.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './Components/profile/profile.component';
import { LivreProfilComponent } from './Components/livre-profil/livre-profil.component';
import { CategoryProfilComponent } from './Components/category-profil/category-profil.component';
import { LivresAssociesComponent } from './Components/livres-associes/livres-associes.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/update-category/update-category.component';
import { UpdateBookComponent } from './Components/update-book/update-book.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { appInterceptorInterceptor } from './Interceptor/app-interceptor.interceptor';



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
    ProfileComponent,
    LivreProfilComponent,
    CategoryProfilComponent,
    LivresAssociesComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    UpdateBookComponent,
    AddBookComponent,
    TasksComponent,
    ConfirmationDialogComponent,
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
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [
    provideAnimationsAsync(),
    {provide:HTTP_INTERCEPTORS, useClass:appInterceptorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  //entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
