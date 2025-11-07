// Importa le funzionalità necessarie da Firebase e Google Cloud
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";

// 1. Inizializza il client Vertex AI
const projectId = process.env.GOOGLE_CLOUD_PROJECT ?? process.env.GCLOUD_PROJECT;

if (!projectId) {
  console.error("ID progetto non configurato. Imposta GOOGLE_CLOUD_PROJECT o GCLOUD_PROJECT.");
  throw new HttpsError(
    'internal',
    "Configurazione del progetto mancante. Contatta l'amministratore."
  );
}

const vertexAI = new VertexAI({ project: projectId, location: "us-central1" });

//modello più economico e veloce per questo tipo di analisi
const model = vertexAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// 2. Definisci la tua Cloud Function richiamabile dal frontend
export const analyzeMatch = onCall(async (request) => {
  
  // Se non c'è l'utente autenticato, blocca l'operazione 
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Richiesta non autorizzata. Esegui il login.');
  }

  const jd = request.data.jd as string;
  const cv = request.data.cv as string;

  // 3. Esegui la validazione di base
  if (!jd || !cv) {
    throw new HttpsError('invalid-argument', 'Devi fornire sia la Job Description che il CV.');
  }

  // 4. Costruisci il Prompt per l'AI
  const prompt = `
    Sei un analista di recruiting. Il tuo compito è valutare il CV rispetto alla Job Description (JD).
    Restituisci la tua analisi ESCLUSIVAMENTE come un oggetto JSON valido.

    ---
    JOB DESCRIPTION: "${jd}"
    ---
    CURRICULUM VITAE: "${cv}"
    ---

    ANALISI RICHIESTA (Formato JSON):
    {
      "matchScore": NUMERO INTERO DA 0 A 100,
      "summary": "Analisi generale del matching in una breve frase.",
      "strengths": [
        "Punto di forza 1 (basato sul CV e la JD)",
        "Punto di forza 2",
        "Punto di forza 3"
      ],
      "gaps": [
        "Mancanza/area debole 1 (basata sul CV e la JD)",
        "Mancanza/area debole 2"
      ]
    }
  `;

try {
    // 5. Chiama l'API Gemini e specifica che vogliamo un output JSON
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    // 6. Esegui un controllo di sicurezza (per TypeScript)
    if (!result.response ||
        !result.response.candidates ||
        !result.response.candidates[0] ||
        !result.response.candidates[0].content ||
        !result.response.candidates[0].content.parts ||
        !result.response.candidates[0].content.parts[0]
      ) {
      
      // Logga la risposta per capire perché è stata bloccata
      console.error("Risposta AI non valida o bloccata:", result.response);
      throw new HttpsError('internal', 'Risposta AI non valida o bloccata. (Controlla i log)');
    }

    // 7. Estrai il testo JSON 
    const jsonText = result.response.candidates[0].content.parts[0].text;
    
    if (!jsonText) {
       throw new HttpsError('internal', 'L\'AI non ha restituito testo.');
    }

    // 8. Restituisci il JSON al frontend
    return JSON.parse(jsonText.trim());

  } catch (error) {
    console.error("Errore durante la chiamata a Gemini:", error);
    throw new HttpsError('internal', 'Errore del server durante l\'analisi AI.');
  }
});