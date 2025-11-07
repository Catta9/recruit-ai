import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user, signOut } from '@angular/fire/auth'; // Importa Auth

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {

  // Inietta il servizio Auth
  readonly auth: Auth = inject(Auth);

  // Ottieni l'observable dell'utente
  user$ = user(this.auth);

  // Funzione per il logout
  logout() {
    signOut(this.auth);
  }
}