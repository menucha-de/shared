import { BehaviorSubject, of, interval, Subscription, from, Observable } from 'rxjs';
import { LogEntry } from './models/log-entry.model';
import { Injectable } from '@angular/core';
import { LogLevel } from './models/log-level.model';
import { LogService } from './log.service';
import { switchMap, map, toArray, concatMap, tap, flatMap } from 'rxjs/operators';
import { LogTargetConfig } from './models/log-target-config.model';
import { LogConfig } from './models/log-config.model';

@Injectable({
  providedIn: 'root'
})
export class LogStore {
  private level = LogLevel.ALL;
  private targetName = 'ALL';
  // private entries: LogEntry[] = [];
  private observe$ = interval(1000);
  private observeSub: Subscription;
  entries$ = new BehaviorSubject<LogEntry[]>([]);
  targetConfigs$ = new BehaviorSubject<LogTargetConfig[]>([]);

  constructor(private service: LogService) {}

  loadFirst() {
    this.loadEntries(1000);
  }

  setLevelFilter(level: LogLevel) {
    this.level = level;
    this.loadEntries(1000);
  }

  setTargetFilter(targetName: string) {
    this.targetName = targetName;
    this.loadEntries(1000);
  }

  setLevel(target: string, level: LogLevel) {
    return this.service.setLevel(target, level).pipe(switchMap(() => this.loadTargets()));
  }

  clearLog(target: string) {
    return this.service.clear(target);
  }

  clearAll() {
    return this.service.getTargets().pipe(
      switchMap(targets => from(targets)),
      flatMap(target => this.service.clear(target.name))
    );
  }

  setObserve(value: boolean) {
    if (value) {
      this.observeSub = this.observe$.subscribe(() => {
        this.loadEntries(8);
      });
    } else {
      this.observeSub.unsubscribe();
      this.loadEntries(1000);
    }
  }

  abortObserving() {
    if (this.observeSub) {
      this.observeSub.unsubscribe();
    }
  }

  private loadEntries(count: number) {
    this.service.getSize(this.targetName, this.level).pipe(switchMap(size => {
      return size > 0
      ? this.service.getEntries(this.targetName, this.level, size, size - count)
      : of(new Array<LogEntry>());
    })).subscribe(entries => {
      this.entries$.next(entries);
    });
  }

  loadTargets() {
    return this.service.getTargets().pipe(
      switchMap(targets => from(targets)),
      concatMap(target => this.service.getLevel(target.name).pipe(
        map(level => new LogTargetConfig(target.label, target.name, level))
      )),
      toArray(),
      tap(targetConfigs => this.targetConfigs$.next(targetConfigs))
    );
  }

  getConfig(): Observable<LogConfig> {
    return this.service.getConfig();
  }

  updateConfig(config: LogConfig): Observable<void> {
    return this.service.updateConfig(config);
  }
}
