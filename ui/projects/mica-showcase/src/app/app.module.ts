import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MicaAppBaseModule, MicaLogViewerModule, MicaAppComponentsModule } from '@mica/shared';
import { MicaControlsModule } from '@mica/controls';
import { ActionButtonDemoComponent } from './action-button-demo/action-button-demo.component';
import { BigButtonDemoComponent } from './big-button-demo/big-button-demo.component';
import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'test', component: DialogDemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ActionButtonDemoComponent,
    BigButtonDemoComponent,
    DialogDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MicaControlsModule,
    MicaAppComponentsModule,
    MicaAppBaseModule,
    MicaLogViewerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
