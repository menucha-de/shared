import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mica-action-button',
  templateUrl: './action-button.component.html',
  animations: [
    trigger('actionsHover', [
      state('true', style({ width: '*' })),
      state('false', style({ width: 0 })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input() defaultIcon: string;
  @Input() text: string;
  @Input() title = '';
  @Input() expandable = true;
  @Input() unexciting = false;
  @Input() checkable = false;
  @Input() checked = false;
  @Input() labelWidth = '17em';

  @Output() default = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();
  @Output() check = new EventEmitter<boolean>();
  @ViewChild('actions', { static: true }) actions: HTMLDivElement;

  extend = false;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  onDefaultAction() {
    this.default.emit(null);
  }

  onOpenAction() {
    this.open.emit(null);
  }
  getextendclass() {
    if (this.extend) {
      return 'notextend';
    } else {
      return 'extend';
    }
  }
  showActions(show = true) {
    this.extend = show;
  }

  getUrl(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imagePath})`);
  }

  get computedWidth() {
    return this.sanitizer.bypassSecurityTrustStyle('calc(' + this.labelWidth + ' + ' + '1em)');
  }

  changeValue(value: boolean) {
    this.check.emit(value);
  }
}
