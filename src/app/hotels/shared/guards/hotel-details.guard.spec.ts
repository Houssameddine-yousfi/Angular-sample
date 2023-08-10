import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hotelDetailsGuard } from './hotelDetailsGuard';

describe('hotelDetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => hotelDetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
