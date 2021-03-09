import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[micaExcludeChars]'
})
export class ExcludeCharsDirective {

  @Input() regex: string;
  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    return !(new RegExp(this.regex).test(event.key));
  }

}
