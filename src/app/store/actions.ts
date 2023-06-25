import { Injectable, effect, inject } from '@angular/core';
import { State } from './state';
import { HttpService } from '../services/http.service';
import { DisneyCharacter, Post, Todo } from '../models';
import axios from 'axios';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class Actions {
  private key = 'store';
  private _stateService = inject(State);
  private _httpService = inject(HttpService);
  private _localStorageService = inject(LocalStorageService);

  constructor() {
    effect(() => {
      // runs everytime the store changes
      this._localStorageService.setItem(this.key, this._stateService.store());
    });
  }

  // with side effect because this is with asynchroneous call
  async fetchTodos() {
    this.enableLoading();

    try {
      const { data } = await this._httpService.get<Todo[]>('todos');
      this._stateService.store.mutate((store) => (store.todos = data));
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  async fetchPosts() {
    this.enableLoading();

    try {
      const { data } = await this._httpService.get<Post[]>('posts');
      this._stateService.store.mutate((store) => (store.posts = data));
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  async fetchDisneyCharacters() {
    this.enableLoading();

    try {
      const { data } = await axios.get<DisneyCharacter>(
        'https://api.disneyapi.dev/character'
      );
      this._stateService.store.mutate((store) => (store.disney = data.data));
      console.log(data.data);
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  // without side effect because this is a pure function
  removeTodoById(index: number) {
    this._stateService.store.mutate((state) => {
      state.todos.splice(index, 1);
    });
  }

  async createPost(value: Post) {
    this.enableLoading();

    try {
      const { data } = await this._httpService.post<Post>('posts', value);
      this._stateService.store.mutate((store) => {
        store.posts.push(data);
      });
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  private enableLoading() {
    this._stateService.store.mutate((store) => {
      store.loading = true;
      store.error = '';
    });
  }

  private setError(message: string) {
    this._stateService.store.mutate((store) => (store.error = message));
  }

  private disableLoading() {
    this._stateService.store.mutate((store) => (store.loading = false));
  }
}
