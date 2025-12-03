import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  template: ` <router-outlet> </router-outlet> `,
  styles: [],
})
export class App {
  protected readonly title = signal('Battle Plan');
}
