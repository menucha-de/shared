import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-action-button-demo',
  templateUrl: './action-button-demo.component.html',
  styleUrls: ['./action-button-demo.component.scss']
})
export class ActionButtonDemoComponent implements OnInit {

  expandable = true;
  label = 'Button';
  unexciting = false;
  checkable = false;
  checked = false;
  disabled = false;
  event = '';
  title: string;
  constructor() { }

  ngOnInit() {
  }

  onDefaultClick() {
    this.event = 'Default clicked';
  }

  onOpenClick() {
    this.event = 'Open clicked';
  }

  onCheckChange(value: boolean) {
    this.event = 'Value changed: ' + value;
  }

  onAction1() {
    this.event = 'Action1 clicked';console.log("caca");
  }
}
