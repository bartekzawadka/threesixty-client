import { TestBed, inject } from '@angular/core/testing';

import { ThreesixtyService } from './threesixty.service';

describe('ThreesixtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreesixtyService]
    });
  });

  it('should be created', inject([ThreesixtyService], (service: ThreesixtyService) => {
    expect(service).toBeTruthy();
  }));
});
