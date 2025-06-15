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
    let time = 0;
    service.time$.subscribe((val) => (time = val));
    service.start();

    expect(time).toBe(0);
    tick(100);
    expect(time).toBe(0.1);
    tick(200);
    expect(time).toBe(0.3);
  }));

  it('should stop correctly', fakeAsync(() => {
    let current = 0;
    service.time$.subscribe((val) => (current = val));

    service.start();
    tick(300);
    expect(current).toBe(0.3);

    service.start();
    tick(500);
    expect(current).toBe(0.3);
  }));

  it('should reset correctly', fakeAsync(() => {
    let current = 0;
    service.time$.subscribe((val) => (current = val));

    service.start();
    tick(500);
    expect(current).toBe(0.5);

    service.reset();
    expect(current).toBe(0);
  }));
});
