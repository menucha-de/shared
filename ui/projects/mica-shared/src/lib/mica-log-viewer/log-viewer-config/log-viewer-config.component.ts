import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, from } from 'rxjs';
import { LogService } from '../log.service';
import { LogTargetConfig } from '../models/log-target-config.model';
import { LogLevel } from '../models/log-level.model';
import { LogStore } from '../log.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcasterService } from '../../mica-app-components/services/broadcaster.service';
import { LogConfig } from '../models/log-config.model';

@Component({
  selector: 'mica-log-viewer-config',
  templateUrl: './log-viewer-config.component.html',
  styleUrls: ['./log-viewer-config.component.scss']
})
export class LogViewerConfigComponent implements OnInit {

  targets$: Observable<LogTargetConfig[]>;
  levels$: Observable<LogLevel[]>;
  config: LogConfig = {persistent: false, maxEntries: 1000} as LogConfig;

  constructor(
    private location: Location,
    private service: LogService,
    private store: LogStore,
    private spinner: NgxSpinnerService,
    private broadcaster: BroadcasterService
  ) { }

  ngOnInit() {
    this.levels$ = this.service.getLevels();
    this.targets$ = this.store.targetConfigs$;
    this.store.loadTargets().subscribe();
    this.getConfig();
  }

  onClose() {
    this.location.back();
  }

  showError(error: any) {
    this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'error'], ['message', error.error]]));
    this.spinner.hide('log-config');
  }

  showSpinner() {
    return setTimeout(() => this.spinner.show('log-config'), 500);
  }

  hideSpinner(time: any) {
    clearTimeout(time);
    this.spinner.hide('log-config');
  }

  setLevel(level: string, target: string) {
    const time = this.showSpinner();
    this.store.setLevel(target, LogLevel[level]).subscribe(() => this.hideSpinner(time), error => this.showError(error));
  }

  clearLog(target: string) {
    const time = this.showSpinner();
    this.store.clearLog(target).subscribe(() => this.hideSpinner(time), error => this.showError(error));
  }

  clearAll() {
    const time = this.showSpinner();
    this.store.clearAll().subscribe(() => this.hideSpinner(time), error => this.showError(error));
  }

  getConfig() {
    this.store.getConfig().subscribe((config) => this.config = config, error => this.showError(error));
  }

  updateConfig() {
    this.store.updateConfig(this.config).subscribe(() => {
      this.broadcaster.broadcast('message', new Map<string, string>([['messageType', 'warning'], ['message', 'These changes will take effect after restarting the container']]));
    }, error => this.showError(error));
  }
}
