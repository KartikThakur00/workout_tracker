import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'workout_tracker';
}
