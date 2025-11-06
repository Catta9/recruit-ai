import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Analysis } from './analysis/analysis';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Analysis],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recruit-ai');
}
