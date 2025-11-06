import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Header } from '../header/header'; 
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './analysis.html',
  styleUrl: './analysis.css',
})

export class Analysis {

  jobDescription: string = ''; 
  candidateCV: string = ''; 
  
  isLoading: boolean = false;  
  error: string | null = null; 
  result: any | null = null; 

  // CONSTRUCTOR: Inietta i servizi qui
  private readonly functions: Functions;
  private readonly firestore: Firestore;
  private readonly auth: Auth;

  constructor() {
    this.functions = inject(Functions);
    this.firestore = inject(Firestore);
    this.auth = inject(Auth);
  }

  async analyze() {
    this.isLoading = true;
    this.error = null;
    this.result = null;

    // `this.jobDescription` e `this.candidateCV` sono stringhe, non funzioni
    if (!this.jobDescription || !this.candidateCV) { 
      this.error = 'Per favore, compila entrambi i campi.';
      this.isLoading = false;
      return;
    }

    try {
      const analyzeMatchFn = httpsCallable(this.functions, 'analyzeMatch');
      // Passa le stringhe `this.jobDescription` e `this.candidateCV`
      const response: any = await analyzeMatchFn({ jd: this.jobDescription, cv: this.candidateCV }); 
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
        jd_snippet: this.jobDescription.substring(0, 50) + "...", 
        cv_snippet: this.candidateCV.substring(0, 50) + "...",
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