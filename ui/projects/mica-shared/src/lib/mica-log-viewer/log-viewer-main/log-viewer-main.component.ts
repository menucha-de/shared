import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, OnDestroy } from '@angular/core';
import { LogService } from '../log.service';
import { Observable } from 'rxjs';
import { LogEntry } from '../models/log-entry.model';
import { LogLevel } from '../models/log-level.model';
import { LogTarget } from '../models/log-target.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { tap, map } from 'rxjs/operators';
import { LogStore } from '../log.store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mica-log-viewer-main',
  templateUrl: './log-viewer-main.component.html',
  styleUrls: ['./log-viewer-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogViewerMainComponent implements OnInit, OnDestroy {
  entries$: Observable<LogEntry[]>;
  levels$: Observable<LogLevel[]>;
  targets$: Observable<LogTarget[]>;

  level: LogLevel = LogLevel.ALL;
  targetName = 'ALL';
  observing = false;
  firstOpen = true;
  private readonly exportUrl = 'rest/log/ALL/ALL/export';
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;

  constructor(
    private service: LogService,
    public store: LogStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.levels$ = this.service.getLevels().pipe(tap(levels => {
      if (levels.length > 0) {
        this.level = levels[levels.length - 1];
        this.store.setLevelFilter(this.level);
      }
    }));
    this.targets$ = this.service.getTargets().pipe(map(targets => {
      targets.push({ name: 'ALL', label: 'ALL'});
      return targets;
    }));
    this.entries$ = this.store.entries$.pipe(tap(() => {
      setTimeout(() => this.viewport.scrollTo({ bottom: 0,  }), 50);
    }));
  }

  ngOnDestroy(): void {
    this.store.abortObserving();
  }

  onExport() {
    window.open(this.exportUrl, '_blank');
  }

  onReload() {
    this.store.loadFirst();
  }

  private withZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  getDate(date: number): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${this.withZero(d.getMonth() + 1)}-${this.withZero(d.getDate())} ${d.toLocaleTimeString()}`;
  }

  onObserve(value: boolean) {
    this.observing = value;
    this.store.setObserve(this.observing);
  }

  onOpen(value: boolean) {
    if (value && this.firstOpen) {
      this.store.loadFirst();
      this.firstOpen = false;
    }
  }
  onShowDetails(id: number) {
    this.router.navigate(['log/detail', id]);
  }

  onConfigure() {
    this.router.navigate(['log/config']);
  }
}
