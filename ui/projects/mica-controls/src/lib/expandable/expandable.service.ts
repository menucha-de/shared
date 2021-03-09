import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ToggleGroup {
  id: string;
  group: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExpandableService {

  private toggleSubject = new Subject<ToggleGroup>();
  constructor() { }

  toggle(id: string, group: string, value: boolean) {
    this.toggleSubject.next({ id: id, group: group, value: value});
  }

  get toggled() {
    return this.toggleSubject.asObservable();
  }
}
