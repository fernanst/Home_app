import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigClimaComponent } from './config-clima.component';

describe('ConfigClimaComponent', () => {
  let component: ConfigClimaComponent;
  let fixture: ComponentFixture<ConfigClimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigClimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
