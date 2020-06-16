import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form-component/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question-component/dynamic-form-question/dynamic-form-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule],
declarations: [DynamicFormComponent, DynamicFormQuestionComponent],
exports: [DynamicFormComponent, DynamicFormQuestionComponent]    
})
export class SharedModule { }