import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'historia',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../historia/lista-foros/lista-foros.module').then(m => m.ListaForosPageModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat/chat.module').then(m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'personaje',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../personaje/personaje.module').then(m => m.PersonajePageModule)
          }
        ]
      },
      {
        path: 'pnjs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../gestionPnjs/lista-pnjs/lista-pnjs.module').then(m => m. ListaPnjsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
