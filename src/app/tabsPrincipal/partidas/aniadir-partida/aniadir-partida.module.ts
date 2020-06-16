import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirPartidaPageRoutingModule } from './aniadir-partida-routing.module';

import { AniadirPartidaPage } from './aniadir-partida.page';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { ListFilterPipe } from '../multi-select/list-filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { DynamicFormComponent } from 'src/app/components/dynamic-form-component/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from 'src/app/components/dynamic-form-question-component/dynamic-form-question/dynamic-form-question.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AniadirPartidaPageRoutingModule,
    SharedModule
  ],
  declarations: [AniadirPartidaPage,MultiSelectComponent,ListFilterPipe
  ]
})
export class AniadirPartidaPageModule {}
