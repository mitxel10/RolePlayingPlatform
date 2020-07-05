import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPnjsPageRoutingModule } from './lista-pnjs-routing.module';

import { ListaPnjsPage } from './lista-pnjs.page';
import { AniadirPnjPageModule } from '../aniadir-pnj/aniadir-pnj.module';
import { DetallePnjPageModule } from '../detalle-pnj/detalle-pnj.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPnjsPageRoutingModule,
    AniadirPnjPageModule,
    DetallePnjPageModule
  ],
  declarations: [ListaPnjsPage]
})
export class ListaPnjsPageModule {}
