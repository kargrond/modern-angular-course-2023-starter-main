import { Injectable, effect, inject, signal } from '@angular/core';
import { DisneyCharacterData, Post, Todo } from '../models';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class State {
  private key = 'store';
  store = signal<StoreType>(initialStoreState);
  private _localStorageService = inject(LocalStorageService);

  constructor() {
    const localStore = this._localStorageService.getItem<StoreType>(this.key);
    if (localStore) this.store.set(localStore);

    // the effect can only be used inside the constructor
    effect(() => this._localStorageService.setItem(this.key, this.store()));
  }
}

export interface StoreType {
  loading: boolean;
  error: string;
  todos: Todo[];
  posts: Post[];
  disney: DisneyCharacterData[];
}

const initialStoreState: StoreType = {
  loading: false,
  error: '',
  todos: [],
  posts: [],
  disney: [],
};
