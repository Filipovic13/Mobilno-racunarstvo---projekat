import { TestBed } from '@angular/core/testing';

import { StarredRecipesService } from './starred-recipes.service';

describe('StarredRecipesService', () => {
  let service: StarredRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarredRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
