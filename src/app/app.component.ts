import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from './Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  formLogin!: FormGroup;
  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'Library_Management_v2';
  isMenuOpen = false;
  isclicked=false;
  isMobileMenuOpen = false
  isLoggedIn=false;

  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router){}


  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: this.fb.control('',Validators.required),
      password: this.fb.control('',Validators.required)
    });
   
  }
  HandleLogin() {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
   this.authService.login(email,password).subscribe({
      next: (data) => {
        console.log('Data from backend:', data);
        this.authService.LoadProfile(data);
        this.isLoggedIn = true;
      },
      error: (err) => {
        console.log(err);
      }
   })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleBar() {
    this.drawer.toggle();
    this.isclicked = !this.isclicked;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen; // Toggles the mobile menu
  }






}
