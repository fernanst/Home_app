import { TestBed } from '@angular/core/testing';

import { MqttIotService } from './mqtt-iot.service';

describe('MqttIotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MqttIotService = TestBed.get(MqttIotService);
    expect(service).toBeTruthy();
  });
});
