import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcasterService } from './broadcaster.service';

export type MessageType = 'error' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private _scrollbarWidth: number = null;
  private doc: HTMLElement;
  spinning = false;
  constructor(
    private spinner: NgxSpinnerService,
    private broadcaster: BroadcasterService
  ) {
    this.doc = this.docElement;
  }

  private calculateScrollBarWidth(): number {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);
    return w1 - w2;
  }

  get scrollbarWidth(): number {
    if (this._scrollbarWidth == null) {
      this._scrollbarWidth = this.calculateScrollBarWidth();
    }
    return this._scrollbarWidth;
  }

  get contentScrollTop(): number {
    if (window == null || window.parent == null
      || window.parent.parent == null
      || window.parent.parent.document == null) {
      return 0;
    }
    if (window.parent.parent.document.body != null) {
      // Implementation for Chrome. IE and Firefox will always return 0
      let result = window.parent.parent.document.body.scrollTop;
      if (result === 0) {
        // Implementation for IE and Firefox. Chrome will always return 0
        if (window.parent.parent.document.documentElement != null) {
          result = window.parent.parent.document.documentElement.scrollTop;
        }
      }
      return result;
    } else {
      return 0;
    }
  }

  get windowParentInnerHeight(): number {
    return window.parent.parent.innerHeight;
  }

  get contentOffsetTop(): number {
    if (window == null || window.parent == null
      || window.parent.parent == null
      || window.parent.parent.document == null) {
      return 0;
    }
    if (window.parent.parent.document.getElementById('content') != null) {
      return window.parent.parent.document.getElementById('content').offsetTop;
    } else {
      return 0;
    }
  }

  toMap<V>(value: Object): Map<string, V> {
    const result = new Map<string, V>();
    for (const [pkey, pvalue] of Object.entries(value)) {
      result.set(pkey, pvalue as V);
    }
    return result;
  }

  toObject<V>(value: Map<string, V>): Object {
    const result = {};
    for (const [key, val] of value) {
      result[key] = val;
    }
    return result;
  }

  showSpinner() {
    this.spinner.show().then(() => {
      this.spinning = true;
    });

  }

  hideSpinner() {
    this.spinner.hide().then(() => {
      this.spinning = false;
    });
  }

  showMessage(messageType: MessageType, message: string) {
    this.broadcaster.broadcast('message', new Map<string, string>([['messageType', messageType], ['message', message]]));
  }

  private get docElement(): HTMLElement {
    if (window == null || window.parent == null
      || window.parent.parent == null
      || window.parent.parent.document == null) {
      return null;
    }
    if (window.parent.parent.document.body != null) {
      // Implementation for Chrome. IE and Firefox will always return 0
      let doc: HTMLElement;
      if (window.parent.parent.document.body.scrollTop === 0) {
        // Implementation for IE and Firefox. Chrome will always return 0
        if (window.parent.parent.document.documentElement != null) {
          doc = window.parent.parent.document.documentElement;
        }
      }
      return doc;
    } else {
      return null;
    }
  }

  scrollTo(position: number) {
    if (this.doc) {
      const offsetPosition = position + this.contentOffsetTop - 36;
      if (offsetPosition < this.contentScrollTop) {
        this.doc.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }

}
