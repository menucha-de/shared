import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    DialogComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    DialogComponent,
  ]
})
export class MicaAppComponentsModule { }
