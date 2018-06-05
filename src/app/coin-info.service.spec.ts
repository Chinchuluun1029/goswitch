import { TestBed, inject } from '@angular/core/testing';

import { CoinInfoService } from './coin-info.service';

describe('CoinInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinInfoService]
    });
  });

  it('should be created', inject([CoinInfoService], (service: CoinInfoService) => {
    expect(service).toBeTruthy();
  }));
});
