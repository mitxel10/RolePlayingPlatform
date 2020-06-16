import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { MultiSelectComponent } from '../partidas/multi-select/multi-select.component';
import { ListFilterPipe } from '../partidas/multi-select/list-filter.pipe';
import { DynamicFormComponent } from 'src/app/components/dynamic-form-component/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from 'src/app/components/dynamic-form-question-component/dynamic-form-question/dynamic-form-question.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
