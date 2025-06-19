import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  afterEach(() => {
    service.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start and increment correctly', fakeAsync(() => {
    const time = service.time;
    expect(time()).toBe(0);

    service.start();
    tick(100);
    expect(time()).toBe(0.1);
    tick(200);
    expect(time()).toBe(0.3);
  }));

  it('should stop correctly', fakeAsync(() => {
    const time = service.time;

    service.start();
    tick(300);
    expect(time()).toBe(0.3);

    service.stop();
    tick(500);
    expect(time()).toBe(0.3);
  }));

  it('should reset correctly', fakeAsync(() => {
    const time = service.time;

    service.start();
    tick(500);
    expect(time()).toBe(0.5);

    service.reset();
    expect(time()).toBe(0);
  }));

  it('should not start if already started', fakeAsync(() => {
    service.start();
    service.start();
    tick(500);
    service.start();
    expect(service.time()).toBe(0.5);
  }));
});
