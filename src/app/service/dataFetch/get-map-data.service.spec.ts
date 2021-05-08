import { TestBed } from '@angular/core/testing';

import { GetMapDataService } from './get-map-data.service';

describe('GetMapDataService', () => {
  let service: GetMapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
