import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then(m => m.FolderPage),
  },
 {
  path: 'noticias',
   loadComponent: () =>
   import('./noticias/noticias.page').then(m => m.NoticiasPage),
},
 ];
