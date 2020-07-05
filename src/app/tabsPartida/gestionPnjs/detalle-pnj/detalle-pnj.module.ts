import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePnjPageRoutingModule } from './detalle-pnj-routing.module';

import { DetallePnjPage } from './detalle-pnj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePnjPageRoutingModule
  ],
  declarations: [DetallePnjPage]
})
export class DetallePnjPageModule {}
