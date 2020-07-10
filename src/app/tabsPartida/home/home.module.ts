import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReglasPageModule } from './reglas/reglas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    HomePageRoutingModule,
    ReglasPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
