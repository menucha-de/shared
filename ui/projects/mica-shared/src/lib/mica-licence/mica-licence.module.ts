import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LicenseComponent } from './license/license.component';
import { LicensingComponent } from './licensing/licensing.component';
import { LicenseRequestComponent } from './license-request/license-request.component';
import { MicaControlsModule } from '@menucha-de/controls';
import { MicaAppComponentsModule } from '../mica-app-components/mica-app-components.module';

export const licenseRoutes: Routes = [
  {
    path: 'license',
    children: [
      { path: 'activate/:name', component: LicensingComponent },
      { path: 'request', component: LicenseRequestComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LicenseComponent,
    LicensingComponent,
    LicenseRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MicaControlsModule,
    MicaAppComponentsModule,
    RouterModule.forChild(licenseRoutes)
  ],
  exports: [
    LicenseComponent,
    LicensingComponent
  ]
})
export class MicaLicenceModule { }
