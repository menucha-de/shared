import { Component } from '@angular/core';
import { ServiceState } from '@mica/controls';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  label = 'Expandable';
  enabled = true;
  unexciting = false;
  simple = false;
  lastEvent = 'None';
  showContent = false;
  showHeader = false;
  caption = 'Widgets demo';
  state = ServiceState.Started;
  labelPosition = 'right';
  states = ServiceState;
  small = false;
  onShow(showContent: boolean) {
    this.showContent = !showContent;
    this.lastEvent = 'onShow: ' + showContent;
  }
}
