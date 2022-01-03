import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIluminacionComponent } from './config-iluminacion.component';

describe('ConfigIluminacionComponent', () => {
  let component: ConfigIluminacionComponent;
  let fixture: ComponentFixture<ConfigIluminacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigIluminacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIluminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
