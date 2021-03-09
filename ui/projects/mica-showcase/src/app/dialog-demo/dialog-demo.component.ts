import { Component, OnInit } from '@angular/core';
import { CloseAction } from '@mica/shared';

@Component({
  selector: 'ui-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent implements OnInit {

  showDialog = false;
  title = 'Dialog title';
  okText = 'Apply';
  whiteOut = 'true';

  lastEvent = 'None';

  constructor() { }

  ngOnInit() {
  }

  onShowDialog() {
    this.showDialog = true;
  }

  onClose(closeAction: CloseAction) {
    this.showDialog = false;
    if (closeAction === CloseAction.OK) {
      this.lastEvent = 'Closed with OK';
    } else {
      this.lastEvent = 'Closed with Cancel';
    }
  }
}
