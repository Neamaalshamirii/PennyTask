import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],   // ❗ just RouterModule, NO forRoot here
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'mean-task';
}
