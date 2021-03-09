import { Directive, ElementRef, OnChanges, Renderer2, Input, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[micaButton]'
})
export class ButtonDirective implements OnChanges {

  @Input() icon: string;
  @HostBinding('class.mica-button') micaButton = true;
  private button: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.button = this.elementRef.nativeElement;
  }

  ngOnChanges() {
    if (this.icon != null) {
      const background = `url('assets/images/${this.icon}') no-repeat 0.5em, linear-gradient(#fff, #f2f2f2)`;
      this.renderer.setStyle(this.button, 'background', background);
      this.renderer.setStyle(this.button, 'padding-left', '2.2em');
    }
  }
}
