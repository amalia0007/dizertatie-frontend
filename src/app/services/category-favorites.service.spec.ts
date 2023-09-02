import { TestBed } from '@angular/core/testing';

import { CategoryFavoritesService } from './category-favorites.service';

describe('CategoryFavoritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryFavoritesService = TestBed.get(CategoryFavoritesService);
    expect(service).toBeTruthy();
  });
});
