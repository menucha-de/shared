import { Component, OnInit, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscriber } from '../models/subscriber.model';
import { TransportPropertiesComponent } from '../transport-properties/transport-properties.component';
import { TransportComponent } from '../transport/transport.component';
import { CloseAction } from '../../mica-app-components/dialog/close-action.model';
import { SecurityComponent, CertType } from '../security/security.component';
import { SecurityFiles } from '../models/security-files.model';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';
import { TransportConfig, TransportConfigService } from '../models/transport-config.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'mica-transport-dialog',
  templateUrl: './transport-dialog.component.html',
  styleUrls: ['./transport-dialog.component.scss']
})
export class TransportDialogComponent implements OnInit {

  subscriberTypes = [];
  subscriber$: Observable<Subscriber>;
  subscriberSaved = new EventEmitter<Subscriber>();
  secure = false;
  securityFiles = new SecurityFiles();
  origin: string;

  @ViewChild(TransportPropertiesComponent) properties: TransportPropertiesComponent;
  @ViewChild(TransportComponent) transport: TransportComponent;
  @ViewChild(SecurityComponent) security: SecurityComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransportService,
    private broadcaster: BroadcasterService,
    private spinner: NgxSpinnerService,
    @Inject(TransportConfigService) private config: TransportConfig
  ) { }

  ngOnInit() {
    this.subscriber$ = this.route.paramMap.pipe(switchMap(paramMap => {
      const id = paramMap.get('id');
      this.origin = paramMap.get('origin');
      return this.certsExist(id).pipe(switchMap(([hasKeyStore, hasTrusted]) => {
        this.securityFiles.hasKeyStore = hasKeyStore;
        this.securityFiles.hasTrusted = hasTrusted;
        return this.service.getSubscriber(id);
      }));
    }));
  }

  private certsExist(id: string) {
    return zip(this.service.hasKeyStore(id), this.service.hasTrusted(id));
  }

  onClose(action: CloseAction, subscriber: Subscriber) {
    if (action === CloseAction.Cancel) {
      if (this.origin) {
        this.router.navigateByUrl(this.origin);
      } else {
        this.router.navigate([this.config.subscribers.routeParentUrl]);
      }
    } else {
      subscriber.uri = this.transport.saveUri();
      subscriber.enable = true;
      this.properties.saveProperties();
      const saveSubscriber$ = subscriber.id !== null
        ? this.service.setSubscriber(subscriber).pipe(map(() => subscriber.id))
        : this.service.addSubscriber(subscriber);
        this.spinner.show();
      saveSubscriber$.subscribe((id: string) => {
        this.uploadCerts(subscriber.id);
        this.broadcaster.broadcast('subscribersChanged', id);
        if (this.origin) {
          this.router.navigateByUrl(`${this.origin};subscriberId=${id}`);
        } else {
          this.router.navigate([this.config.subscribers.routeParentUrl]);
        }
        this.spinner.hide();
      }, err => {
        this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message',
          err.error]]));
      });
    }
  }

  uploadCerts(id: string) {
    if (this.securityFiles.trusted) {
      this.service.setTrustCert(id, this.securityFiles.trusted).subscribe();
    }
    if (this.securityFiles.client) {
      this.service.setPassphrase(this.securityFiles.passphrase).pipe(
        switchMap(key => this.service.setKeyStore(id, key, this.securityFiles.client))
      ).subscribe();
    }
  }
  checkSecure(secure: boolean) {
    this.secure = secure;
  }

  deleteCert(certType: CertType, id: string) {
    if (id !== 'new') {
      if (certType === 'client') {
        this.service.deleteKeyStore(id).pipe(
          switchMap(() => this.service.hasKeyStore(id))
        ).subscribe(hasKeyStore => this.securityFiles.hasKeyStore = hasKeyStore);
      } else if (certType === 'trusted') {
        this.service.deleteTrustCert(id).pipe(
          switchMap(() => this.service.hasTrusted(id))
        ).subscribe(hasTrusted => this.securityFiles.hasTrusted = hasTrusted);
      }
    }
  }
}
