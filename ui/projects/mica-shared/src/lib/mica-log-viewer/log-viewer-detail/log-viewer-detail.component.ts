import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LogEntry } from '../models/log-entry.model';
import { LogStore } from '../log.store';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'mica-log-viewer-detail',
  templateUrl: './log-viewer-detail.component.html',
  styleUrls: ['./log-viewer-detail.component.scss']
})
export class LogViewerDetailComponent implements OnInit {

  entry$: Observable<LogEntry>;
  constructor(
    private store: LogStore,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.entry$ = this.route.paramMap.pipe(switchMap(paramMap => {
      const id = +paramMap.get('id');
      return this.store.entries$.pipe(map(entries => {
        return entries.find(entry => entry.id === id);
      }));
    }));
  }

  onClose() {
    this.location.back();
  }
}
