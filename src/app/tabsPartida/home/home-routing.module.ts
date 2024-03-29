import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ReglasPage } from './reglas/reglas.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'reglas',
    component: ReglasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
