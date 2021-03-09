import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportPropertiesComponent } from './transport-properties.component';

describe('TransportPropertiesComponent', () => {
  let component: TransportPropertiesComponent;
  let fixture: ComponentFixture<TransportPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
