import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mica-busy-button',
  templateUrl: './busy-button.component.html',
  styleUrls: ['./busy-button.component.scss']
})
export class BusyButtonComponent implements OnInit {

  @Input() busy = false;
  @Input() idleText: string;
  @Input() busyText: string;

  @Output() toggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.busy = !this.busy;
    this.toggle.emit(this.busy);
  }

}
