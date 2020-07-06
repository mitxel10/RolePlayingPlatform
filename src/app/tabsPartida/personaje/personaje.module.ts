import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonajePageRoutingModule } from './personaje-routing.module';

import { PersonajePage } from './personaje.page';
import { SharedModule } from 'src/app/components/shared.module';
import { ItemsPersonajePageModule } from './items-personaje/items-personaje.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonajePageRoutingModule,
    SharedModule,
    ItemsPersonajePageModule
  ],
  declarations: [PersonajePage]
})
export class PersonajePageModule {}
