import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Header } from '../header/header'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, ],
  templateUrl: './analysis.html',
  styleUrl: './analysis.css',
})

export class Analysis {

  jd: string = ''; 
  cv: string = ''; 
  
  isLoading: boolean = false;  
  error: string | null = null; 
  result: any | null = null; 

  // CONSTRUCTOR: Inietta i servizi qui
  private readonly functions: Functions;
  private readonly firestore: Firestore;
  private readonly auth: Auth;
  private readonly router: Router;

  constructor() {
    this.functions = inject(Functions);
    this.firestore = inject(Firestore);
    this.auth = inject(Auth);
    this.router = inject(Router);

    //Controlla lo stato del router all'avvio
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { jd: string };
    if (state && state.jd) {
      this.jd = state.jd;
    }
  }

  async analyze() {
    this.isLoading = true;
    this.error = null;
    this.result = null;

    // `this.jd` e `this.cv` sono stringhe, non funzioni
    if (!this.jd || !this.cv) { 
      this.error = 'Per favore, compila entrambi i campi.';
      this.isLoading = false;
      return;
    }

    try {
      const analyzeMatchFn = httpsCallable(this.functions, 'analyzeMatch');
      // Passa le stringhe `this.jd` e `this.cv`
      const response: any = await analyzeMatchFn({ jd: this.jd, cv: this.cv }); 
      this.result = response.data;

      // --- LOGICA DI SALVATAGGIO  ---
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error("Utente non trovato, impossibile salvare.");
      }

      const dataToSave = {
        ...response.data, 
        userId: user.uid,
        createdAt: serverTimestamp(),
        // Usa le variabili stringa
        jd_snippet: this.jd.substring(0, 50) + "...", 
        cv_snippet: this.cv.substring(0, 50) + "...",
      };

      const collectionRef = collection(this.firestore, `users/${user.uid}/analyses`);
      await addDoc(collectionRef, dataToSave);
      
    } catch (err: any) {
      console.error(err);
      this.error = err.message || 'Si è verificato un errore sconosciuto.';
    } finally {
      this.isLoading = false;
    }
  }
}