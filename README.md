# RecruitAI

Benvenuto nel repository di RecruitAI, un'applicazione web dedicata alla gestione intelligente dei processi di selezione del personale.
Web App pensata per aiutare i recruiter in fase iniziale per fare una scrematura dei CV più appetibili. Tramite una semplice interfaccia grafica l'utente potrà inserire una job descriptioned un CV, dopo l'analisi gli verrà restituito un punteggio in centesimi sull'affinità del CV alla job description, punti di forza e competenza mancanti.
Questo processo di analisi è integrato tramite l'AI di Google Gemini tramite prompt ottimizzati.
Se registrati si potrà inoltre avere accesso alla cronologia e selezionare una job description, analizzata precedentemente, con cui ripetere l'analisi.

# Full stack Google

La Web application è stata realizzata intereamente con lo stack che mette a disposizione Google per realizzare applicazioni. Permette di coprire ogni aspetto della realizzazione usando tecnologie efficienti e sicure:
- autentificazione tramite l'accesso con account Google;
- front-end efficiente, moderno e pulito con il framework Angular;
- memorizzazione dei dati in un database sicuro Firestore dello stack Google;
- integrazione a basso costo con molti modelli di AI di Google e altri provider;
- distribuzione gestita con Firebase Hosting, con certificati SSL automatici e routing globale.

## Contenuti
- **Tecnologie**: Angular, TypeScript, Firebase, Gemioni API.
- **Strumenti**: Google firebase e Google Cloud Console,

## Avvio rapido
```bash
npm install
npm run start
```
Il comando avvia l'ambiente di sviluppo su `http://localhost:4200/`.

## Visualizzazione
- **Produzione**: quando l'app è distribuita su Firebase Hosting è disponibile all'indirizzo https://recruit-ai-project-735fe.web.app (redirect automatico anche su `https://recruit-ai-project-735fe.firebaseapp.com`).
- **Locale**: eseguire la procedura di [avvio rapido](#avvio-rapido) ed aprire il browser su `http://localhost:4200/`.

## Script utili
- `npm run build`: genera una build di produzione nella cartella `dist/`.
- `npm run test`: esegue la suite di test unitari.

## Prossimi step
- **Possibilità di inserire un CV in formato PDF**: sarà necessario estendere il front-end per gestire l'upload dei file, salvare i documenti (ad esempio su Firebase Storage) e introdurre un servizio di estrazione del testo (es. Cloud Functions con integrazione a Document AI o librerie dedicate) per alimentare l'analisi dell'AI.
