import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglasPageRoutingModule } from './reglas-routing.module';

import { ReglasPage } from './reglas.page';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglasPageRoutingModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [ReglasPage]
})
export class ReglasPageModule {}
