import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePnjPageRoutingModule } from './detalle-pnj-routing.module';

import { DetallePnjPage } from './detalle-pnj.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePnjPageRoutingModule,
    SharedModule
  ],
  declarations: [DetallePnjPage]
})
export class DetallePnjPageModule {}
