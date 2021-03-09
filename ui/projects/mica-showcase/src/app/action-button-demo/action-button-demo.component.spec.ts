import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonDemoComponent } from './action-button-demo.component';

describe('ActionButtonDemoComponent', () => {
  let component: ActionButtonDemoComponent;
  let fixture: ComponentFixture<ActionButtonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
