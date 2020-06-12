import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAmigosPageRoutingModule } from './lista-amigos-routing.module';

import { ListaAmigosPage } from './lista-amigos.page';
import { AniadirAmigoPageModule } from '../aniadir-amigo/aniadir-amigo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAmigosPageRoutingModule,
    AniadirAmigoPageModule
  ],
  declarations: [ListaAmigosPage]
})
export class ListaAmigosPageModule {}
