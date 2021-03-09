import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionFrameComponent } from './section-frame/section-frame.component';
import { MicaControlsModule } from '@peramic/controls';
import { ClickOutsideModule } from 'ng-click-outside';
import { MicaLicenceModule } from '../mica-licence/mica-licence.module';
import { MicaLogViewerModule } from '../mica-log-viewer/mica-log-viewer.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MicaAppComponentsModule } from '../mica-app-components/mica-app-components.module';

@NgModule({
  declarations: [
    SectionFrameComponent
  ],
  imports: [
    CommonModule,
    MicaControlsModule,
    MicaAppComponentsModule,
    MicaLicenceModule,
    MicaLogViewerModule,
    ClickOutsideModule,
    NgxSpinnerModule
  ],
  exports: [
    SectionFrameComponent
  ]
})
export class MicaAppBaseModule { }
