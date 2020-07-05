import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPartidasPageRoutingModule } from './lista-partidas-routing.module';

import { ListaPartidasPage } from './lista-partidas.page';
import { AniadirPartidaPageModule } from '../aniadir-partida/aniadir-partida.module';
import { CrearPersonajePageModule } from '../crear-personaje/crear-personaje/crear-personaje.module';
import { ListaPnjPageModule } from '../lista-pnj/lista-pnj.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPartidasPageRoutingModule,
    AniadirPartidaPageModule,
    CrearPersonajePageModule,
    ListaPnjPageModule
  ],
  declarations: [ListaPartidasPage]
})
export class ListaPartidasPageModule {}
