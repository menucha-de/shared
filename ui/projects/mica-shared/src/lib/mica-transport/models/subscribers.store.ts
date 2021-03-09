import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoreAction, LOAD_ALL, LOAD, ADD, EDIT, REMOVE } from './store-action.model';
import { Subscriber } from './subscriber.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribersStore {
  private subscribers: Subscriber[] = [];
  items$ = new BehaviorSubject<Subscriber[]>([]);
  dispatch(action: StoreAction) {
    this.subscribers = this._reduce(this.subscribers, action);
    this.items$.next(this.subscribers);
  }

  _reduce(subscribers: Subscriber[], action: StoreAction) {
    switch (action.type) {
      case LOAD_ALL:
        return [...action.data];
      case ADD:
        return [...subscribers, action.data];
      case EDIT:
        return subscribers.map(subscriber => {
          const editedSubscriber = action.data;
          if (subscriber.id !== editedSubscriber.id) {
            return subscriber;
          }
          return editedSubscriber;
        });
      case REMOVE:
        return subscribers.filter(subscriber => subscriber.id !== action.data);
      default:
        return subscribers;
    }
  }

}
