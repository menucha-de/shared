import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from '../models/subscriber.model';
import { TransportService } from '../transport.service';
import { Router } from '@angular/router';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';
import { TransportConfig, TransportConfigService } from '../models/transport-config.model';
import { UtilService } from '../../mica-app-components/services/util.service';

@Component({
  selector: 'mica-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

  @Input() group: string;
  @Input() labelWidth: string;
  subscribers$: Observable<Subscriber[]>;
  expanded = false;

  private errorHandler = (err: { error: string; }) => {
    this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message', err.error]]));
  }

  constructor(
    private transportService: TransportService,
    private router: Router,
    private broadcaster: BroadcasterService,
    private util: UtilService,
    @Inject(TransportConfigService) private config: TransportConfig
  ) { }

  ngOnInit() {
    this.subscribers$ = this.transportService.subscribers$;
  }

  showSubscriber(id: string) {
    this.router.navigate([this.config.subscribers.routeParentUrl, 'subscribers', id]);
  }

  loadSubscribers() {
    this.transportService.getSubscribers().subscribe(() => null, this.errorHandler);
  }

  deleteSubscriber(id: string) {
    this.transportService.deleteSubscriber(id).subscribe(() => {
      this.broadcaster.broadcast('subscriberDeleted', id);
    }, this.errorHandler);
  }

  addSubscriber() {
    this.router.navigate([this.config.subscribers.routeParentUrl, 'subscribers', 'new']);
  }

  onToggle(value: boolean) {
    if (!value) {
      this.transportService.getSubscribers().subscribe(() => {
        this.expanded = !value;
      }, this.errorHandler);
    } else {
      this.expanded = !value;
    }
  }

  scroll(position: number) {
    this.util.scrollTo(position);
  }
}
