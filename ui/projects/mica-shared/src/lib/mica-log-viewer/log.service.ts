import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { LogLevel } from './models/log-level.model';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { LogTarget } from './models/log-target.model';
import { LogEntry } from './models/log-entry.model';
import { BroadcasterService } from '../mica-app-components/services/broadcaster.service';
import { delayedRetry } from '../mica-app-components/services/operators';
import { LogConfig } from './models/log-config.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private readonly baseUrl = 'rest/log/';
  private maxRetry = 0;
  constructor(
    private http: HttpClient,
    private broadcaster: BroadcasterService,
    @Inject('ENVIRONMENT') private env: any,
  ) {
    this.maxRetry = env.maxRetry;
  }

  getLevels(): Observable<LogLevel[]> {
    return this.http.get<string[]>(this.baseUrl + 'levels').pipe(
      delayedRetry(2000, this.maxRetry),
      map(levels => {
        return levels.map<LogLevel>(level => LogLevel[level]);
      })
    );
  }

  getTargets(): Observable<LogTarget[]> {
    return this.http.get<LogTarget[]>(this.baseUrl + 'targets').pipe(
      delayedRetry(2000, this.maxRetry)
    );
  }

  getLevel(target: string): Observable<LogLevel> {
    return this.http.get<string>(this.baseUrl + target + '/level').pipe(map(level => LogLevel[level]));
  }

  setLevel(target: string, level: LogLevel) {
    return this.http.put(this.baseUrl + target + '/level', '\"' + level + '\"', { headers:  { 'Content-Type': 'application/json' } });
  }

  getSize(target: string, level: LogLevel) {
    return this.http.get<number>(`${this.baseUrl}${target}/${level}`);
  }

  getEntries(target: string, level: LogLevel, limit: number, offset: number): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(`${this.baseUrl}${target}/${level}/${limit}/${offset}`);
  }

  clear(target: string) {
    return this.http.delete(this.baseUrl + target);
  }

  private handleError(error: HttpErrorResponse) {
    this.broadcaster.broadcast('message' , new Map<string, string>([['messageType', 'error'], ['message', error.error]]));
    return throwError(error);
  }

  getConfig(): Observable<LogConfig> {
    return this.http.get<LogConfig>(this.baseUrl + 'config', { headers:  { 'Content-Type': 'application/json' } });
  }

  updateConfig(config: LogConfig): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'config', config, { headers:  { 'Content-Type': 'application/json' } });
  }
}
