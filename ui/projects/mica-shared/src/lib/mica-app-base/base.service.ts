import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BroadcasterService } from '../mica-app-components/services/broadcaster.service';
import { AppInfo } from '../models/app-info.model';
import { catchError, retry } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(
    private http: HttpClient,
    private broadcaster: BroadcasterService
  ) { }

  getAppInfo() {
    return this.http.get<AppInfo>('rest/license/appinfo').pipe(
      catchError(err => {
        return this.handleError(err, this.broadcaster);
      })
    );
  }

  private handleError(error: HttpErrorResponse, service: BroadcasterService) {
    // TODO: Workaround until AppInfo will be available without license service
    if (error.status === 404) {
      const appInfo = new AppInfo();
      appInfo.log = 'log';
      return of(appInfo);
    }
    service.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message', error.error]]));

    return throwError(error);
  }
}
