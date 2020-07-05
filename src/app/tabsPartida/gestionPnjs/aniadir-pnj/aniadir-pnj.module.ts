import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirPnjPageRoutingModule } from './aniadir-pnj-routing.module';

import { AniadirPnjPage } from './aniadir-pnj.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniadirPnjPageRoutingModule,
    SharedModule
  ],
  declarations: [AniadirPnjPage]
})
export class AniadirPnjPageModule {}
