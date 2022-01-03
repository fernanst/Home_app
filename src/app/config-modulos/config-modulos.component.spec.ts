import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModulosComponent } from './config-modulos.component';

describe('ConfigModulosComponent', () => {
  let component: ConfigModulosComponent;
  let fixture: ComponentFixture<ConfigModulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigModulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
