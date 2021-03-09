import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate} from '@angular/animations';
import { UtilService } from '../../mica-app-components/services/util.service';
import { BaseService } from '../base.service';
import { share, map, tap, switchMap } from 'rxjs/operators';
import { BaseInfo } from '../../models/base-info';

interface Message {
  message: string;
  messageType: string;
}

@Component({
  selector: 'mica-section-frame',
  animations: [
    trigger(
      'fade',
      [
        transition(':enter', [style({opacity: 0}), animate('300ms', style({opacity: 1}))]),
        transition(':leave', [style({opacity: 1}), animate('300ms', style({opacity: 0}))])
      ]
    )
  ],
  templateUrl: './section-frame.component.html',
  styleUrls: ['./section-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionFrameComponent implements OnInit, AfterViewInit {

  @Input() appTitle: string;
  @Input() caption: string;
  @Input() showHeader: boolean;
  @Input() showBack = true;
  @Output() back = new EventEmitter<any>();
  message$: Observable<Message>;
  baseInfo$: Observable<BaseInfo>;

  constructor(
    private broadcaster: BroadcasterService,
    public util: UtilService,
    private service: BaseService
  ) { }

  ngOnInit() {
    this.message$ = this.broadcaster.on<Map<string, string>>('message').pipe(map(message => {
      const messageText = message.get('message');
      const messageType = message.get('messageType');
      return {
        message: messageText != null ? messageText : '',
        messageType: messageType != null ? messageType : 'clear'
      };
    }),
    tap(message => {
      if (message.messageType != null && message.messageType === 'warning') {
        setTimeout(() => {
          this.confirmError();
        }, 5000);
      }
    }));
    const appInfo$ = this.service.getAppInfo().pipe(share());
    this.baseInfo$ = this.broadcaster.on('appInfo').pipe(switchMap(() => appInfo$.pipe(map(appInfo => {
      return {
        isUnlicensed: appInfo.product != null && (appInfo.license == null || appInfo.license === 'UNLICENSED'),
        hasLogging: appInfo.log != null && appInfo.log.length > 0,
        label: appInfo.label
      };
    }))));
  }

  ngAfterViewInit() {
    this.broadcaster.broadcast('appInfo', false);
  }
  confirmError() {
    this.broadcaster.broadcast('message' , new Map<string, string>([['messageType', 'clear'], ['message', '']]));
  }

  onBackClick() {
    this.back.emit();
  }

  get popupTop(): string {
    return this.util.contentScrollTop + this.util.windowParentInnerHeight - this.util.contentOffsetTop - 150 + 'px';
  }
}
