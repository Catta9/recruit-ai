import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analysis',
  imports: [CommonModule, FormsModule],
  templateUrl: './analysis.html',
  styleUrl: './analysis.css',
})
export class Analysis {
  jobDescription: string = ''; // variabile per il testo della JD
  candidateCV: string = ''; // varibaile per il testo del CV

  // metodo che chiameremo cliccando il pulsante
  analyze(){
    console.log('Analisi avviata!');
    console.log('JD:', this.jobDescription.substring(0, 50) + '...');
    console.log('CV:', this.candidateCV.substring(0, 50) + '...');
  }
}
