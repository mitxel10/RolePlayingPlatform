import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaForosPageRoutingModule } from './lista-foros-routing.module';

import { ListaForosPage } from './lista-foros.page';
import { AniadirForoPageModule } from '../aniadir-foro/aniadir-foro.module';
import { ForoPageModule } from '../foro/foro.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaForosPageRoutingModule,
    AniadirForoPageModule,
    ForoPageModule
  ],
  declarations: [ListaForosPage]
})
export class ListaForosPageModule {}
