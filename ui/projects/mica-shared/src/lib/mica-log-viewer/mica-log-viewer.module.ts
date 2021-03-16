import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogViewerMainComponent } from './log-viewer-main/log-viewer-main.component';
import { MicaControlsModule } from '@menucha-de/controls';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LogViewerDetailComponent } from './log-viewer-detail/log-viewer-detail.component';
import { LogViewerConfigComponent } from './log-viewer-config/log-viewer-config.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MicaAppComponentsModule } from '../mica-app-components/mica-app-components.module';

const logRoutes: Routes = [
  {
    path: 'log',
    children: [
      { path: 'detail/:id', component: LogViewerDetailComponent },
      { path: 'config', component: LogViewerConfigComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LogViewerMainComponent,
    LogViewerDetailComponent,
    LogViewerConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MicaControlsModule,
    MicaAppComponentsModule,
    NgxSpinnerModule,
    RouterModule.forChild(logRoutes),
    ScrollingModule
  ],
  exports: [
    LogViewerMainComponent,
    LogViewerDetailComponent,
    LogViewerConfigComponent,
    RouterModule
  ]
})
export class MicaLogViewerModule { }
