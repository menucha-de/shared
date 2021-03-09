import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppInfo } from '../models/app-info.model';
import { License } from './model/license.model';
import { BroadcasterService } from '../mica-app-components/services/broadcaster.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(
    private http: HttpClient,
    private broadcaster: BroadcasterService
  ) { }

  getAppInfo() {
    return this.http.get<AppInfo>(`rest/license/appinfo`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getLicense() {
    return this.http.get<License>(`rest/license/request`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  activateLicense(val: string) {
    return this.http.put(`rest/license`, val, { headers: { 'Content-Type': 'application/octet-stream' }}).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    this.broadcaster.broadcast('message' , new Map<string, string>([['messageType', 'error'], ['message', error.error]]));
    return throwError(error);
  }

}
