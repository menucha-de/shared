import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFrameComponent } from './section-frame.component';

describe('SectionFrameComponent', () => {
  let component: SectionFrameComponent;
  let fixture: ComponentFixture<SectionFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
