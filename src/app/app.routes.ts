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
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'service',
    loadComponent: () => import('./service/service.page').then( m => m.ServicePage)
  },
 ];
