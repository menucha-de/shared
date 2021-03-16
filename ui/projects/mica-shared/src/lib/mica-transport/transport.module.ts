import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportComponent } from './transport/transport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransportDialogComponent } from './transport-dialog/transport-dialog.component';
import { RouterModule } from '@angular/router';
import { TransportPropertiesComponent } from './transport-properties/transport-properties.component';
import { SecurityComponent } from './security/security.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { MicaControlsModule } from '@menucha-de/controls';
import { SubscriptionDialogComponent } from './subscription-dialog/subscription-dialog.component';
import { TransportConfig, TransportConfigService } from './models/transport-config.model';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MicaAppComponentsModule } from '../mica-app-components/mica-app-components.module';

@NgModule({
  declarations: [
    TransportComponent,
    TransportDialogComponent,
    TransportPropertiesComponent,
    SecurityComponent,
    SubscribersComponent,
    SubscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MicaControlsModule,
    MicaAppComponentsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    TransportComponent,
    TransportDialogComponent,
    TransportPropertiesComponent,
    SubscribersComponent,
    SubscriptionDialogComponent
  ]
})
export class TransportModule {
  static forRoot(config: TransportConfig): ModuleWithProviders<TransportModule> {
    return {
      ngModule: TransportModule,
      providers: [
        {
          provide: TransportConfigService,
          useValue: config
        }
      ]
    };
  }
}
