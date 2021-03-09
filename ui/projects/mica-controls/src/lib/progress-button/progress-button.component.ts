import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResultEvent } from './result-event';
import { ResultStatus } from './result-status';

@Component({
  selector: 'mica-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent implements OnInit {
  private resultEvent = new ResultEvent();

  @Input()
  text: string;

  @Input()
  disabled = false;

  @Output()
  action = new EventEmitter<ResultEvent>();

  constructor() { }

  ngOnInit() {
  }

  perform() {
    this.action.emit(this.resultEvent);
  }

  get statusImage() {
    switch (this.resultEvent.status) {
      case ResultStatus.RUNNING:
        return 'assets/images/status_progress.png';
      case ResultStatus.SUCCESSFULLY:
        return 'assets/images/status_success.png';
      case ResultStatus.FAILED:
        return 'assets/images/status_failed.png';
      default:
        return null;
    }
  }

  get loading() {
    return this.resultEvent.status === ResultStatus.RUNNING;
  }
}
