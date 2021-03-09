import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenseService } from '../license.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloseAction } from '../../mica-app-components/dialog/close-action.model';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';

@Component({
  selector: 'mica-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.scss']
})
export class LicensingComponent implements OnInit {

  productKey = '';
  name$: Observable<string>;
  constructor(
    private router: Router,
    private data: LicenseService,
    private route: ActivatedRoute,
    private broadcaster: BroadcasterService
  ) { }

  ngOnInit() {
    this.name$ = this.route.params.pipe(map(params => 'Activate ' + decodeURI(params['name'])));
  }

  onClose(action: CloseAction) {
    if (action === CloseAction.Cancel) {
      this.router.navigate([''], { relativeTo: this.route });
    } else {
      this.activateLicense();
    }
  }

  activateLicense() {
    this.data.activateLicense(this.productKey).subscribe(() => {
      this.broadcaster.broadcast('appInfo', true);
      this.router.navigate([''], { relativeTo: this.route });
    });
  }

  getRequest() {
    this.router.navigate(['/license/request'] );
  }

}
