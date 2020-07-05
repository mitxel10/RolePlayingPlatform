import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPnjPageRoutingModule } from './lista-pnj-routing.module';

import { ListaPnjPage } from './lista-pnj.page';
import { CrearPnjPageModule } from '../crear-pnj/crear-pnj.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPnjPageRoutingModule,
    CrearPnjPageModule
  ],
  declarations: [ListaPnjPage]
})
export class ListaPnjPageModule {}
