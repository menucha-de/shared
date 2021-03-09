import { Component, OnInit, EventEmitter, Output, Input, Renderer2, OnDestroy } from '@angular/core';
import { UtilService } from '../services/util.service';
import { CloseAction } from './close-action.model';

@Component({
  selector: 'mica-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  @Input() caption: string;
  @Input() okText: string;
  @Input() okDisabled = false;
  @Input() whiteOut = true;

  @Output() close = new EventEmitter<CloseAction>();
  private readonly headerHeight = 50;
  private readonly defaultOffset = 15;
  topMargin: string;
  closeAction = CloseAction;

  constructor(private renderer: Renderer2, private util: UtilService) {
    if (document.body.scrollHeight > window.innerHeight) {
      this.renderer.addClass(document.body, 'no-scroll');
      this.renderer.setStyle(document.body, 'margin-right', util.scrollbarWidth + 'px');
    }
  }

  private calculateTopMargin(): string {
    const offsetTop = this.util.contentOffsetTop;
    if (offsetTop > 0) {
      const dialogOffsetTop = offsetTop - this.headerHeight;
      const scrollTop = this.util.contentScrollTop;
      if (scrollTop > dialogOffsetTop + this.defaultOffset) {
        return scrollTop - dialogOffsetTop + 'px';
      } else {
        return this.defaultOffset + 'px';
      }
    }
    return null;
  }

  ngOnInit() {
    this.topMargin = this.calculateTopMargin();
  }

  closeDialog(action: CloseAction) {
    this.close.emit(action);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.renderer.removeStyle(document.body, 'margin-right');
  }
}
