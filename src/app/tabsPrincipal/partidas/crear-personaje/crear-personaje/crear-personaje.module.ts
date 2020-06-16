import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPersonajePageRoutingModule } from './crear-personaje-routing.module';

import { CrearPersonajePage } from './crear-personaje.page';
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
    CrearPersonajePageRoutingModule,
    SharedModule
  ],
  declarations: [CrearPersonajePage]
})
export class CrearPersonajePageModule {}
