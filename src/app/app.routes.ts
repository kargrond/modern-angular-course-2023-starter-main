import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./pages/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'disney',
    loadComponent: () =>
      import('./pages/disney.component').then((m) => m.DisneyComponent),
  },
  {
    // This is the default route, returns to home page
    path: '**',
    redirectTo: '',
  },
];
