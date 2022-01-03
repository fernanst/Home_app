import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEnergiaComponent } from './config-energia.component';

describe('ConfigEnergiaComponent', () => {
  let component: ConfigEnergiaComponent;
  let fixture: ComponentFixture<ConfigEnergiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigEnergiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
