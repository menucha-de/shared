import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewerMainComponent } from './log-viewer-main.component';

describe('LogViewerMainComponent', () => {
  let component: LogViewerMainComponent;
  let fixture: ComponentFixture<LogViewerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogViewerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
