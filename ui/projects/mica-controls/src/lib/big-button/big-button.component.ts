import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mica-big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.scss']
})
export class BigButtonComponent implements OnInit {

  @Input() name: string;
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() active = true;
  @Input() smaller = false;

  @Output() leftClick = new EventEmitter();
  @Output() rightClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  rightClickAction(event: any) {
    this.rightClick.emit();
    return false;
  }

  leftClickAction(event: any) {
    this.leftClick.emit();
  }
}
