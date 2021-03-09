import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewerDetailComponent } from './log-viewer-detail.component';

describe('LogViewerDetailComponent', () => {
  let component: LogViewerDetailComponent;
  let fixture: ComponentFixture<LogViewerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogViewerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
