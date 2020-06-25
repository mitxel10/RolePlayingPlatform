import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirForoPage } from './aniadir-foro.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirForoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirForoPageRoutingModule {}
