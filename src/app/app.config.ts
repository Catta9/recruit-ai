import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ 
      projectId: "recruit-ai-project-735fe", 
      appId: "1:682763051051:web:3a77553ea41dbd2c408a6e", 
      storageBucket: "recruit-ai-project-735fe.firebasestorage.app", 
      apiKey: "AIzaSyBGPzS-ZD1nXPq4W30LlbtzT3VX39bqbGY", 
      authDomain: "recruit-ai-project-735fe.firebaseapp.com", 
      messagingSenderId: "682763051051", 
      measurementId: "G-C91J29PGCK"  
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())
  ]
};
