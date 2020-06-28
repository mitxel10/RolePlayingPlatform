import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form-component/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question-component/dynamic-form-question/dynamic-form-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FileSizeFormatPipe } from './fileSizeFormatPipe/file-size-format.pipe';

@NgModule({
imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule],
declarations: [DynamicFormComponent, DynamicFormQuestionComponent, FileSizeFormatPipe],
exports: [DynamicFormComponent, DynamicFormQuestionComponent, FileSizeFormatPipe]    
})
export class SharedModule { }