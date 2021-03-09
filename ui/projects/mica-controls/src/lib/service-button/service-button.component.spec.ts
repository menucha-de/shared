import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceButtonComponent } from './service-button.component';

describe('ServiceButtonComponent', () => {
  let component: ServiceButtonComponent;
  let fixture: ComponentFixture<ServiceButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
