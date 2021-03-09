import { Directive, Input, HostBinding } from '@angular/core';

type InputType = 'rounded' | 'no-border';

@Directive({
  selector: 'input[micaInput], select[micaSelect]'
})
export class InputDirective {

  @Input() shape: InputType = 'rounded';

  @HostBinding('class.mica-rounded') get rounded() {
    return this.shape === 'rounded';
  }

  @HostBinding('class.mica-no-border') get table() {
    return this.shape === 'no-border';
  }

  constructor() { }

}
