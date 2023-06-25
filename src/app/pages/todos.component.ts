import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SharedModule],
  template: `<h1
      class="{{
        store().loading ? 'animate-pulse text-yellow-500' : 'text-yellow-500'
      }} text-4xl font-bold"
    >
      {{ store().loading ? 'loading..' : 'Todos' }}
    </h1>
    <ul class="bg-green-100 p-5 rounded-lg">
      <li
        class="mr-5 bg-yellow-200 text-blue-800 p-2 rounded-md mb-2 hover:bg-yellow-400 cursor-pointer flex justify-between items-center"
        *ngFor="let todo of store().todos; let i = index"
      >
        <span>{{ todo.title }}</span>
        <button
          class="text-white bg-red-400 hover:bg-red-600 rounded py-1 px-2"
          (click)="handleRemoveTodo(i)"
        >
          Done
        </button>
      </li>
    </ul> `,
  styles: [],
})
export class TodosComponent implements OnInit {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);

  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchTodos();
  }

  handleRemoveTodo(index: number) {
    this._actionsService.removeTodoById(index);
  }
}
