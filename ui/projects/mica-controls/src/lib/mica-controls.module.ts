import { NgModule } from '@angular/core';
import { ActionButtonComponent } from './action-button/action-button.component';
import { BigButtonComponent } from './big-button/big-button.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { SwitchComponent } from './switch/switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionButtonItemComponent } from './action-button-item/action-button-item.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ProgressButtonComponent } from './progress-button/progress-button.component';
import { ServiceButtonComponent } from './service-button/service-button.component';
import { SlideDownComponent } from './slide-down/slide-down.component';
import { BusyButtonComponent } from './busy-button/busy-button.component';
import { ExcludeCharsDirective } from './directives/exclude-chars.directive';
import { ButtonDirective } from './directives/button.directive';
import { InputDirective } from './directives/input.directive';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { EditSelectComponent } from './edit-select/edit-select.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    BigButtonComponent,
    ExpandableComponent,
    SwitchComponent,
    ActionButtonItemComponent,
    CheckboxComponent,
    ProgressButtonComponent,
    ServiceButtonComponent,
    SlideDownComponent,
    BusyButtonComponent,
    ExcludeCharsDirective,
    ButtonDirective,
    InputDirective,
    IconButtonComponent,
    EditSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ActionButtonComponent,
    BigButtonComponent,
    ExpandableComponent,
    SwitchComponent,
    ActionButtonItemComponent,
    CheckboxComponent,
    ProgressButtonComponent,
    ServiceButtonComponent,
    SlideDownComponent,
    BusyButtonComponent,
    ExcludeCharsDirective,
    ButtonDirective,
    InputDirective,
    EditSelectComponent,
  ]
})
export class MicaControlsModule { }
