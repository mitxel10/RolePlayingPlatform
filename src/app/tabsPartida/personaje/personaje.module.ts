import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonajePageRoutingModule } from './personaje-routing.module';

import { PersonajePage } from './personaje.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonajePageRoutingModule,
    SharedModule
  ],
  declarations: [PersonajePage]
})
export class PersonajePageModule {}
