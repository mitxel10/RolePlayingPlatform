import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsPersonajePageRoutingModule } from './items-personaje-routing.module';

import { ItemsPersonajePage } from './items-personaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPersonajePageRoutingModule
  ],
  declarations: [ItemsPersonajePage]
})
export class ItemsPersonajePageModule {}
