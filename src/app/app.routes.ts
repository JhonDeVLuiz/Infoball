import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabela',
    pathMatch: 'full'
  },
  { path: 'tabela', loadComponent: () => import('./tabela/tabela.page').then(m => m.TabelaPage)

   },
    {
    path: 'noticias',
    loadComponent: () => import('./noticias/noticias.page').then(m => m.NoticiasPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage)
  },
  {
    path: 'jogos',
    loadComponent: () => import('./jogos/jogos.page').then(m => m.JogosPage)
  },
  {
    path: 'editar-jogo/:id',
    loadComponent: () => import('./editar-jogo/editar-jogo.page').then(m => m.EditarJogoPage)
  },
  {
    path: 'cadastrar-jogo',
    loadComponent: () => import('./cadastrar-jogo/cadastrar-jogo.page').then(m => m.CadastrarJogoPage)
  }
];