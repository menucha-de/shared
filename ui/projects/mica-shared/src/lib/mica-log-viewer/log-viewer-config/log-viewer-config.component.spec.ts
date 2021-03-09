import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewerConfigComponent } from './log-viewer-config.component';

describe('LogViewerConfigComponent', () => {
  let component: LogViewerConfigComponent;
  let fixture: ComponentFixture<LogViewerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogViewerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
