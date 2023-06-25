import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { State } from '../store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `<p>home works!</p>
    <div>todos left: {{ store().todos.length }}</div>
    <div>posts left: {{ store().posts.length }}</div>`,
  styles: [],
})
export class HomeComponent {
  private _stateService = inject(State);
  store = this._stateService.store;
}
