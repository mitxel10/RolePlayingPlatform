import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPnjPageRoutingModule } from './crear-pnj-routing.module';

import { CrearPnjPage } from './crear-pnj.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPnjPageRoutingModule,
    SharedModule
  ],
  declarations: [CrearPnjPage]
})
export class CrearPnjPageModule {}
