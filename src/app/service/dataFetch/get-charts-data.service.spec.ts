import { TestBed } from '@angular/core/testing';

import { GetChartsDataService } from './get-charts-data.service';

describe('GetChartsDataService', () => {
  let service: GetChartsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetChartsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
