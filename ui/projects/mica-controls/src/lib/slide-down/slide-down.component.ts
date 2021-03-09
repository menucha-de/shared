import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mica-slide-down',
  animations: [
    trigger('header', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ]),
    trigger('content', [
      state('true', style({ height: '*' })),
      state('false', style({ height: 0 })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ])
  ],
  templateUrl: './slide-down.component.html',
  styleUrls: ['./slide-down.component.css']
})
export class SlideDownComponent implements OnInit {

  @Input() textOpen = 'Expand';
  @Input() textClose = 'Collapse';
  @Input() showContent = false;
  @Input() toggleControls = false;

  @Output() toggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.showContent = !this.showContent;
    this.toggle.emit(this.showContent);
  }
}
