import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirForoPageRoutingModule } from './aniadir-foro-routing.module';

import { AniadirForoPage } from './aniadir-foro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniadirForoPageRoutingModule
  ],
  declarations: [AniadirForoPage]
})
export class AniadirForoPageModule {}
