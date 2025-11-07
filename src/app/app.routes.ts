// Questo definisce le "strade" della tua app

import { Routes } from '@angular/router';

// Importa i tuoi tre componenti "pagina"
import { Analysis } from './analysis/analysis'; 
import { Account } from './account/account';
import { Cronologia} from './cronologia/cronologia';

export const routes: Routes = [
  // Quando un utente visita la radice ("/")
  //    reindirizzalo automaticamente alla pagina 'analisi'.
  { path: '', redirectTo: 'analisi', pathMatch: 'full' },

  // Le nostre tre sezioni principali
  { path: 'analisi', component: Analysis },
  { path: 'cronologia', component: Cronologia },
  { path: 'account', component: Account },

  //  Se un utente visita un URL non valido,
  //    reindirizzalo a 'analisi'.
  { path: '**', redirectTo: 'analisi' }
];