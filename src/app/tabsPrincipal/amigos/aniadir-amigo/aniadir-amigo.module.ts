import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirAmigoPageRoutingModule } from './aniadir-amigo-routing.module';

import { AniadirAmigoPage } from './aniadir-amigo.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniadirAmigoPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AniadirAmigoPage]
})
export class AniadirAmigoPageModule {}
