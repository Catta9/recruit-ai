import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cronologia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cronologia.html',
  styleUrl: './cronologia.css'
})
export class Cronologia {
  //Inietta i servizi
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router); 

  analyses: any[] = []; // Array per contenere i risultati
  isLoading: boolean = true;
  error: string | null = null;

  // ngOnInit viene chiamato quando il componente si carica
  ngOnInit() {
    this.loadAnalyses();
  }

  async loadAnalyses() {
    this.isLoading = true;
    this.error = null;
    const user = this.auth.currentUser;

    if (!user) {
      this.error = "Devi essere loggato per vedere la cronologia.";
      this.isLoading = false;
      return;
    }

    try {
      // Costruisci il percorso e la query per Firestore
      const collectionPath = `users/${user.uid}/analyses`;
      // Ordina i risultati dal più nuovo al più vecchio
      const q = query(collection(this.firestore, collectionPath), orderBy("createdAt", "desc"));

      // Esegui la query
      const querySnapshot = await getDocs(q);

      // Salva i risultati nell'array
      this.analyses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    } catch (err) {
      console.error(err);
      this.error = "Impossibile caricare la cronologia.";
    } finally {
      this.isLoading = false;
    }
  }

  // Funzione per riutilizzare una JD 
  reuseJD(analysis: any) {
    // Naviga alla pagina 'analisi' e passa la JD tramite lo "state" del router.
    this.router.navigate(['/analisi'], { state: { jd: analysis.jd_snippet } }); 
  }
}