import { TestBed } from '@angular/core/testing';

import { AllBrandsService } from './all-brands-service';

describe('AllBrandsService', () => {
  let service: AllBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
