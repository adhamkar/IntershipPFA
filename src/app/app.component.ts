import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Library_Management_v2';
  isMenuOpen = false;
  isclicked=false;
  isMobileMenuOpen = false
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleBar() {
    this.isclicked = !this.isclicked;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen; // Toggles the mobile menu
  }
}
