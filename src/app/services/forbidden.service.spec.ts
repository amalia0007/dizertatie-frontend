import { TestBed } from '@angular/core/testing';

import { ForbiddenService } from './forbidden.service';

describe('ForbiddenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForbiddenService = TestBed.get(ForbiddenService);
    expect(service).toBeTruthy();
  });
});
