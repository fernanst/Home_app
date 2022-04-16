import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatizacionComponent } from './climatizacion.component';

describe('ClimatizacionComponent', () => {
  let component: ClimatizacionComponent;
  let fixture: ComponentFixture<ClimatizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimatizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimatizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
