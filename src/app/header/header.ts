import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit { 

  // Definisce il testo completo e quello che verrà visualizzato
  fullSubtitle = "L'intelligenza Artificiale per il tuo recruiting.";
  displayedSubtitle = '';
  private index = 0;

  constructor() { }

  // Questo metodo parte quando il componente è pronto
  ngOnInit(): void {
    this.typeEffect();
  }

  // La funzione per l'effetto macchina da scrivere
  typeEffect() {
    const typingInterval = setInterval(() => {
      if (this.index < this.fullSubtitle.length) {
        // Aggiunge una lettera al testo visualizzato
        this.displayedSubtitle += this.fullSubtitle.charAt(this.index);
        this.index++;
      } else {
        // Ferma l'intervallo quando il testo è completo
        clearInterval(typingInterval);
      }
    }, 100); // Velocità di battitura (100 millisecondi)
  }

}