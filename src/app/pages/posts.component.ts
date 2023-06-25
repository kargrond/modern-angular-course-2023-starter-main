import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';
import { FormBuilder, Validators } from '@angular/forms';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Post } from '../models';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div
      class="max-w-lg mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg"
    >
      <form
        [formGroup]="postForm"
        (ngSubmit)="handleSubmitPost()"
        class="space-y-4"
      >
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          type="text"
          id="title"
          formControlName="title"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />

        <label for="body" class="block text-sm font-medium text-gray-700"
          >Body</label
        >
        <input
          type="text"
          id="body"
          formControlName="body"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />

        <button
          type="submit"
          class="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
    <h3 class="my-5 text-center text-2xl font-bold">{{ content }}</h3>
    <ul class="mt-10 space-y-4 max-w-lg mx-auto">
      <li
        class="p-6 bg-gray-100 rounded-lg shadow-md"
        *ngFor="let post of store().posts.reverse()"
      >
        <h3 class="text-gray-900 text-xl font-semibold">{{ post.title }}</h3>
        <p class="text-gray-700">{{ post.body }}</p>
      </li>
    </ul>
  `,
  styles: [],
})
export class PostsComponent implements OnInit {
  content = '';
  private _stateService = inject(State);
  private _actionsService = inject(Actions);
  private _formBuilder = inject(FormBuilder);
  store = this._stateService.store;

  postForm = this._formBuilder.group({
    userId: [0],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  async ngOnInit() {
    await this._actionsService.fetchPosts();
    this.watchForm();
  }

  async handleSubmitPost() {
    this.postForm.value.userId = 1;
    await this._actionsService.createPost(this.postForm.value as Post);
    this.postForm.reset();
  }

  private watchForm() {
    const bodyValueChanges = this.postForm.get('body')?.valueChanges;

    if (bodyValueChanges) {
      this.postForm
        .get('title')
        ?.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          combineLatestWith(bodyValueChanges),
          untilDestroyed(this)
        )
        .subscribe(([title, body]) => {
          if (title && body) {
            this.content = `${title}: ${body}`;
          } else {
            this.content = '';
          }
        });
    }
  }
}
