import { Component, inject } from '@angular/core';
import { State } from 'src/app/store';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, MenuComponent],
  template: `
    <nav class="flex items-center bg-gray-100 p-4">
      <app-menu [label]="'Home'" (handleClick)="to('/')"></app-menu>
      <app-menu
        label="Todos"
        [counter]="store().todos.length"
        (handleClick)="to('todos')"
      ></app-menu>
      <app-menu
        label="Posts"
        [counter]="store().posts.length"
        (handleClick)="to('posts')"
      ></app-menu>
      <app-menu
        label="Disney Characters"
        (handleClick)="to('disney')"
      ></app-menu>
    </nav>
  `,
})
export class NavBarComponent {
  stateService = inject(State);
  store = this.stateService.store;
  private _router = inject(Router);

  async to(url: string) {
    await this._router.navigateByUrl(url);
  }
}
