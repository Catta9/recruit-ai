import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router'; 
import { SidebarComponent } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, 
    SidebarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('recruit-ai');

  // Inietta il servizio di Autenticazione
  readonly auth: Auth = inject(Auth);

  // Crea un "Observable" che ci dice chi è l'utente loggato
  user$ = user(this.auth);

  // Crea il provider di Google
  private provider = new GoogleAuthProvider();

  // Funzione per il Login
  login() {
    signInWithPopup(this.auth, this.provider);
  }

  // Funzione per il Logout
  logout() {
    signOut(this.auth);
  }

  // sidebar

  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

}
