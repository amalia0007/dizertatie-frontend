import { TestBed } from '@angular/core/testing';

import { PathResolveServiceService } from './path-resolve-service.service';

describe('PathResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathResolveServiceService = TestBed.get(PathResolveServiceService);
    expect(service).toBeTruthy();
  });
});
