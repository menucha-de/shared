import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-big-button-demo',
  templateUrl: './big-button-demo.component.html',
  styleUrls: ['./big-button-demo.component.scss']
})
export class BigButtonDemoComponent implements OnInit {

  iconUrl = 'assets/images/icon_settings.png';
  active = true;
  smaller = false;

  lastEvent = 'None';
  constructor() { }

  ngOnInit() {
  }

  onLeftClick() {
    this.lastEvent = 'leftClick';
  }

  onRightClick() {
    this.lastEvent = 'rightClick';
  }
}
