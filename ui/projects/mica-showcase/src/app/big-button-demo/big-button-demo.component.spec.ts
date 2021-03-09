import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigButtonDemoComponent } from './big-button-demo.component';

describe('BigButtonDemoComponent', () => {
  let component: BigButtonDemoComponent;
  let fixture: ComponentFixture<BigButtonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigButtonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
