import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subscriptor } from '../models/subscriptor.model';
import { Observable, of } from 'rxjs';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { CloseAction } from '../../mica-app-components/dialog/close-action.model';
import { Subscriber } from '../models/subscriber.model';
import { TransportPropertiesComponent } from '../transport-properties/transport-properties.component';
import { ServiceState } from '@peramic/controls';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';
import { TransportConfig, TransportConfigService } from '../models/transport-config.model';

@Component({
  selector: 'mica-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.scss']
})
export class SubscriptionDialogComponent implements OnInit {

  subscriptor$: Observable<Subscriptor>;
  subscribers$: Observable<Subscriber[]>;
  hasPath = new Map<string, boolean>();
  hasTopic = new Map<string, boolean>();
  private suffix = '';

  @ViewChild(TransportPropertiesComponent) properties: TransportPropertiesComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransportService,
    private broadcaster: BroadcasterService,
    @Inject(TransportConfigService) private config: TransportConfig
  ) { }

  ngOnInit() {
    this.subscribers$ = this.service.getSubscribers().pipe(tap(subscribers => {
      for (const subscriber of subscribers) {
        this.hasPath.set(subscriber.id, subscriber.uri.startsWith('http'));
        this.hasTopic.set(subscriber.id, subscriber.uri.startsWith('mqtt'));
      }
    }));
    this.subscriptor$ = this.route.paramMap.pipe(switchMap(paramMap => {
      const id = paramMap.get('id');
      const suffixParam = paramMap.get('suffix');
      this.suffix = suffixParam != null ? suffixParam : '';
      const subscriberId = paramMap.get('subscriberId');
      return this.service.getSubscription(id, this.suffix).pipe(map(subscriptor => {
        if (subscriberId) {
          subscriptor.subscriberId = subscriberId;
        }
        return subscriptor;
      }));
    }), catchError((err) => {
      this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message',
        err.error]]));
      this.router.navigate([this.config.subscriptions.routeParentUrl]);
      return of(null);
    }));
  }

  onClose(action: CloseAction, subscriptor: Subscriptor) {
    if (action === CloseAction.Cancel) {
      this.service.clearCache();
      this.router.navigate([this.config.subscriptions.routeParentUrl]);
    } else {
      this.properties.saveProperties();
      subscriptor.properties = this.properties.properties;
      const saveSubscription$ = subscriptor.id !== null
        ? this.service.setSubscription(subscriptor, this.suffix).pipe(map(() => subscriptor.id))
        : this.service.addSubscription(subscriptor, this.suffix);
      saveSubscription$.subscribe(() => {
        this.broadcaster.broadcast('subscriptorsChanged', subscriptor.id);
        this.router.navigate([this.config.subscriptions.routeParentUrl]);
      }, err => {
        this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message',
          err.error]]));
      });
    }
  }

  toggleEnable(subscriptor: Subscriptor) {
    subscriptor.enable = !subscriptor.enable;
  }

  getState(subscriptor: Subscriptor): ServiceState {
    return subscriptor && subscriptor.enable ? ServiceState.Started : ServiceState.Stopped;
  }

  subscriberIdChange(subscriberId: string, subscriptor: Subscriptor) {
    if (subscriberId === 'new') {
      this.service.cacheSubscriptor(subscriptor);
      this.router.navigate([this.config.subscriptions.routeParentUrl, 'subscribers', 'new',
        { origin: this.router.url }]);
    } else {
      subscriptor.subscriberId = subscriberId;
    }
    if (!this.hasPath.get(subscriptor.subscriberId)) {
      subscriptor.path = '';
    }
  }

  hasTopicOrPath(subscriberId: string) {
    return this.hasTopic.get(subscriberId) || this.hasPath.get(subscriberId);
  }
}
