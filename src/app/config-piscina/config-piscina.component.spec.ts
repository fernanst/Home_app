import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPiscinaComponent } from './config-piscina.component';

describe('ConfigPiscinaComponent', () => {
  let component: ConfigPiscinaComponent;
  let fixture: ComponentFixture<ConfigPiscinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPiscinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPiscinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
