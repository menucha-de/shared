import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ExpandableService } from './expandable.service';


let count = 0;

@Component({
  selector: 'mica-expandable',
  animations: [
    trigger('header', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(90deg)' })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ]),
    trigger('content', [
      state('true', style({ height: '*' })),
      state('false', style({ height: 0 })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ])
  ],
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit, OnDestroy {

  id = `expandable-${count++}`;
  @Input() group: string;
  @Input() label: string;
  @Input() enabled = true;
  @Input() showContent = false;
  @Input() unexciting = false;
  @Input() simple = true;

  @Output() show = new EventEmitter<boolean>();
  @Output() position = new EventEmitter<number>();
  private toggleSub: Subscription;
  private element: HTMLElement;
  private current: boolean;

  constructor(
    private toggler: ExpandableService,
    elementRef: ElementRef
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.toggleSub = this.toggler.toggled.subscribe(expandable => {
      this.current = expandable.id === this.id;
      if (this.group === expandable.group) {
        if (this.simple) {
          if (this.enabled) {
            this.showContent = this.current ? !expandable.value : false;
          }
        } else {
          this.show.emit(this.current ? expandable.value : true);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.toggleSub) {
      this.toggleSub.unsubscribe();
    }
  }
  toggle() {
    this.toggler.toggle(this.id, this.group, this.showContent);
  }

  done(event: AnimationEvent) {
    if (this.current && event.phaseName === 'done') {
      if (this.showContent) {
        this.position.emit(this.element.offsetTop);
      }
    }
  }
}
