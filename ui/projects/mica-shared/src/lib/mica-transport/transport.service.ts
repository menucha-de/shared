import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SubscribersStore } from './models/subscribers.store';
import { LOAD_ALL, EDIT, ADD, REMOVE } from './models/store-action.model';
import { Subscriber } from './models/subscriber.model';
import { Subscriptor } from './models/subscriptor.model';
import { TransportConfig, TransportConfigService } from './models/transport-config.model';
import { delayedRetry } from '../mica-app-components/services/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  subscribers$: Observable<Subscriber[]>;
  subscriberChanged$ = new BehaviorSubject({});
  baseUrlSubscribers: string;
  baseUrlSubscriptions: string;
  private cachedSubscriptor: Subscriptor;
  private maxRetry = 0;

  constructor(
    private http: HttpClient,
    private store: SubscribersStore,
    @Inject(TransportConfigService) private config: TransportConfig,
    @Inject('ENVIRONMENT') private env: any,
  ) {
    this.subscribers$ = this.store.items$;
    this.baseUrlSubscribers = this.config.subscribers.restBaseUrl;
    this.baseUrlSubscriptions = this.config.subscriptions.restBaseUrl;
    this.maxRetry = env.maxRetry;
  }

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<any[]>(`rest/${this.baseUrlSubscribers}subscribers`).pipe(
      delayedRetry(2000, this.maxRetry),
      map(subscribers => {
        const result: Subscriber[] = [];
        for (const sub of subscribers) {
          result.push(new Subscriber(sub.id, sub.uri, sub.enable, sub.properties));
        }
        return result;
      }),
      tap(subscribers => {
        this.store.dispatch({ type: LOAD_ALL, data: subscribers });
      })
    );
  }

  getSubscriber(id: string): Observable<Subscriber> {
    if (id === 'new') {
      return of(new Subscriber(null, `mqtt://MQTT:1883/topic?qos=0&clientid=`, true, new Map<string, string>()));
    }
    return this.http.get<any>(`rest/${this.baseUrlSubscribers}subscribers/${id}`).pipe(map(subscriber => {
      return new Subscriber(subscriber.id, subscriber.uri, subscriber.enable, subscriber.properties);
    }));
  }

  setSubscriber(value: Subscriber) {
    return this.http.put(`rest/${this.baseUrlSubscribers}subscribers/${value.id}`,
      value.toObject()).pipe(tap(() => {
        this.subscriberChanged$.next(value);
        this.store.dispatch({ type: EDIT, data: value });
      })
    );
  }

  addSubscriber(value: Subscriber) {
    return this.http.post(`rest/${this.baseUrlSubscribers}subscribers`,
      value.toObject(), { responseType: 'text' }).pipe(tap(id => {
        value.id = id;
        this.store.dispatch({ type: ADD, data: value });
      })
    );
  }

  deleteSubscriber(id: string) {
    return this.http.delete(`rest/${this.baseUrlSubscribers}subscribers/${id}`).pipe(tap(() => {
      this.store.dispatch({ type: REMOVE, data: id });
    }));
  }

  setTrustCert(id: string, file: File) {
    const headers = new HttpHeaders().append('Content-Type', 'application/octet-stream');
    return this.http.post(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/trust`, file, { headers: headers });
  }

  hasTrusted(id: string) {
    return this.http.get<boolean>(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/trust`);
  }

  deleteTrustCert(id: string) {
    return this.http.delete(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/trust`);
  }

  deleteKeyStore(id: string) {
    return this.http.delete(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/keystore`);
  }

  setKeyStore(id: string, secKey: string, file: File) {
    const headers = new HttpHeaders().append('Content-Type', 'application/octet-stream');
    return this.http.post(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/keystore?secKey=${secKey}`, file, { headers: headers });
  }

  hasKeyStore(id: string) {
    return this.http.get<boolean>(`rest/${this.baseUrlSubscribers}subscribers/${id}/certs/keystore`);
  }

  setPassphrase(passphrase: string) {
    const headers = new HttpHeaders().append('Content-Type', 'text/plain');
    return this.http.post(`rest/${this.baseUrlSubscribers}subscribers/certs/passphrase`,
      passphrase, { responseType: 'text', headers: headers });
  }

  cacheSubscriptor(value: Subscriptor) {
    this.cachedSubscriptor = value;
  }

  clearCache() {
    this.cachedSubscriptor = null;
  }

  getSubscription(id: string, suffix = ''): Observable<Subscriptor> {
    if (this.cachedSubscriptor) {
      return of(this.cachedSubscriptor);
    }
    if (id === 'new') {
      return of(new Subscriptor(null, '', null, '', false, new Map<string, string>()));
    }
    return this.http.get<any>(`rest/${this.baseUrlSubscriptions}${suffix}/${id}`, { observe: 'response' }).pipe(map(response => {
      if (response.status === 204) {
        return new Subscriptor(id, '', null, '', false, new Map<string, string>());
      } else {
        const subscription: Subscriptor = response.body;
        return new Subscriptor(
          subscription.id,
          subscription.name,
          subscription.subscriberId,
          subscription.path,
          subscription.enable,
          subscription.properties
        );
      }
    }));
  }

  setSubscription(value: Subscriptor, suffix = '') {
    return this.http.put(`rest/${this.baseUrlSubscriptions}${suffix}/${value.id}`, value.toObject()).pipe(tap(() => this.clearCache()));
  }

  addSubscription(value: Subscriptor, suffix = '') {
    return this.http.post(`rest/${this.baseUrlSubscriptions}${suffix}`,
      value.toObject(), { responseType: 'text' }).pipe(tap(() => this.clearCache()));
  }
}
