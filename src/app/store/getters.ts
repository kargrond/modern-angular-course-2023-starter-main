import { Injectable, computed, inject } from '@angular/core';
import { State } from './state';

@Injectable({
  providedIn: 'root',
})
export class Getters {
  private _stateService = inject(State);

  totalObjects = computed(() => {
    return (
      this._stateService.store().todos.length +
      this._stateService.store().posts.length
    );
  });
}
