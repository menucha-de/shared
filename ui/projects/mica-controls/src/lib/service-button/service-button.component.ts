import { Component, Input } from '@angular/core';
import { ServiceState } from './service-state.model';

type LabelPosition = 'left' | 'right';

@Component({
  selector: 'mica-service-button',
  templateUrl: './service-button.component.html',
  styleUrls: ['./service-button.component.scss']
})
export class ServiceButtonComponent {
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() state: ServiceState;
  @Input() labelPosition: LabelPosition = 'left';
  @Input() small = false;
}
